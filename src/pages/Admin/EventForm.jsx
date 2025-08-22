import { useState, useEffect } from 'react';
import { apiUrl } from '../../api/apiUrl';

const EventForm = ({ event, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    openingDate: '',
    closingDate: '',
    image: null // For new image file
  });
  const [existingImage, setExistingImage] = useState({ url: '', publicId: '' }); // For existing image data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with event data when in edit mode
  useEffect(() => {
    if (event) {
      // Format dates by removing milliseconds
      const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().slice(0, 16) : '';
      };
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        openingDate: formatDate(event.openingDate) || '',
        closingDate: formatDate(event.closingDate) || '',
        image: null
      });
      
      // Set existing image data if available
      if (event.image) {
        setExistingImage({
          url: event.image.url || '',
          publicId: event.image.publicId || ''
        });
      }
    } else {
      // Reset form for new event
      setFormData({
        title: '',
        description: '',
        location: '',
        openingDate: '',
        closingDate: '',
        image: null
      });
      setExistingImage({ url: '', publicId: '' });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let imageData = existingImage;
      
      // If a new image was uploaded, upload it first
      if (formData.image) {
        const uploadData = new FormData();
        uploadData.append('image', formData.image);
        
        const uploadResponse = await fetch(apiUrl+'/events', {
          method: 'POST',
          body: uploadData
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        imageData = await uploadResponse.json();
      }
      
      // Prepare the event data with image
      const eventData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        openingDate: new Date(formData.openingDate).toISOString(),
        closingDate: new Date(formData.closingDate).toISOString(),
        image: imageData
      };
      
      const url = event 
        ? `${apiUrl}/events/${event._id}` 
        : `${apiUrl}/events`;
      
      const method = event ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to save event: ${response.status}`);
      }

      onSuccess(); // Trigger refetch in parent
    } catch (err) {
      setError(err.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {event ? 'Edit Event' : 'Create New Event'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Event Image
              </label>
              {existingImage.url && (
                <div className="mb-2">
                  <img 
                    src={existingImage.url} 
                    alt="Event preview" 
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter event title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Describe your event"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Where is the event?"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  name="openingDate"
                  value={formData.openingDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  name="closingDate"
                  value={formData.closingDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {event ? 'Updating...' : 'Creating...'}
                  </>
                ) : event ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;