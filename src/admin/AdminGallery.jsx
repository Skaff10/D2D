import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Trash2, X, Image, Loader2, Plus, Tag } from 'lucide-react'
import { fetchGalleryImages, uploadGalleryImage, deleteGalleryImage } from '../lib/galleryService'
import toast from 'react-hot-toast'

const CATEGORIES = [
  'Exterior Detailing',
  'Interior Detailing',
  'Paint Polish & Protection',
  'Ceramic Coating'
]

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploadForm, setUploadForm] = useState({ file: null, alt: '', category: CATEGORIES[0] })
  const [deleting, setDeleting] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    try {
      const data = await fetchGalleryImages()
      setImages(data)
    } catch (err) {
      console.error('Fetch gallery error:', err)
      toast.error('Failed to load gallery images')
    } finally {
      setLoading(false)
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large (max 10MB)')
      return
    }
    setUploadForm(prev => ({ ...prev, file }))
    // Generate preview
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleUpload() {
    if (!uploadForm.file) {
      toast.error('Please select an image')
      return
    }
    setUploading(true)
    try {
      const newImage = await uploadGalleryImage(uploadForm.file, uploadForm.category, uploadForm.alt)
      setImages(prev => [newImage, ...prev])

      // Reset form
      setUploadForm({ file: null, alt: '', category: CATEGORIES[0] })
      setPreview(null)
      setShowUpload(false)
      if (fileRef.current) fileRef.current.value = ''
      toast.success('Image uploaded!')
    } catch (err) {
      console.error('Upload error:', err)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(image) {
    if (!window.confirm('Delete this image? This cannot be undone.')) return
    setDeleting(image.id)
    try {
      await deleteGalleryImage(image.id, image.storagePath)
      setImages(prev => prev.filter(img => img.id !== image.id))
      toast.success('Image deleted')
    } catch (err) {
      console.error('Delete error:', err)
      toast.error('Failed to delete image')
    } finally {
      setDeleting(null)
    }
  }

  const inputClasses = 'w-full bg-black/50 border border-border-warm rounded-lg px-4 py-2.5 text-white text-sm placeholder-text-muted focus:border-primary transition-all'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Gallery</h2>
          <p className="text-text-muted text-sm mt-1">Manage images shown on the public gallery page.</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2.5 rounded-lg transition-all text-sm"
        >
          <Plus size={16} /> Upload Image
        </button>
      </div>

      {/* Upload Panel */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-card rounded-xl border border-border-warm/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-base font-bold text-white">Upload New Image</h3>
                <button onClick={() => { setShowUpload(false); setPreview(null); setUploadForm({ file: null, alt: '', category: CATEGORIES[0] }) }} className="text-text-muted hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: File + Preview */}
                <div>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-border-warm rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-all group"
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                    ) : (
                      <>
                        <Upload size={32} className="mx-auto text-text-muted mb-3 group-hover:text-primary transition-colors" />
                        <p className="text-text-secondary text-sm">Click to select an image</p>
                        <p className="text-text-muted text-xs mt-1">JPEG, PNG, WebP, AVIF — Max 10MB</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {preview && (
                    <p className="text-text-muted text-xs mt-2 truncate">{uploadForm.file?.name}</p>
                  )}
                </div>

                {/* Right: Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">Category</label>
                    <select
                      className={inputClasses}
                      value={uploadForm.category}
                      onChange={e => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">Alt Text (Optional)</label>
                    <input
                      type="text"
                      className={inputClasses}
                      placeholder="Describe the image..."
                      value={uploadForm.alt}
                      onChange={e => setUploadForm(prev => ({ ...prev, alt: e.target.value }))}
                    />
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !uploadForm.file}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-40 text-black font-semibold py-3 rounded-lg transition-all text-sm mt-2"
                  >
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image count */}
      <p className="text-text-muted text-sm mb-4">{images.length} image{images.length !== 1 ? 's' : ''} in gallery</p>

      {/* Gallery Grid - Masonry */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-primary animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="bg-card rounded-xl border border-border-warm/50 p-12 text-center">
          <Image size={40} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted mb-2">No images uploaded yet</p>
          <button onClick={() => setShowUpload(true)} className="text-primary font-medium text-sm hover:text-primary-light">
            + Upload your first image
          </button>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map(img => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-card rounded-xl border border-border-warm/50 overflow-hidden break-inside-avoid"
            >
              <img
                src={img.imageUrl || img.url}
                alt={img.alt || 'Gallery image'}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white uppercase tracking-wider font-medium">
                    <Tag size={10} />
                    {img.category || 'Uncategorized'}
                  </span>
                  <button
                    onClick={() => handleDelete(img)}
                    disabled={deleting === img.id}
                    className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
                  >
                    {deleting === img.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
                <div>
                  <p className="text-white text-xs truncate">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
