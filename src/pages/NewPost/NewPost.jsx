import styles from './NewPost.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import * as postService  from '../../services/postService'

const NewPost = (props) => {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    title: '',
    category: 'Food',
    journey: '',
    content: '',
  })

  const [photoData, setPhotoData] = useState(null)

  const [journeys, setJourneys] = useState([])

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleChangePhoto = (evt) => {
    setPhotoData(evt.target.files[0])
  }

  useEffect(() => {
    const fetchJourneys = async () => {
      const profile = await profileService.getProfile(props.user.profile)
      setJourneys(profile.journeys)
    }
    fetchJourneys()
  }, [props.user.profile])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const newPost = await postService.create(form)
    await postService.addPostPhoto(photoData, newPost._id)
    navigate('/')
  }

  

  return (  
    <main className={styles.container}>
      <h1>New Post</h1>
      <form className={styles.form} autoComplete='off' onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor='title-input'>Title</label>
          <textarea
            required
            rows={2}
            cols={25}
            name='title'
            id='title-input'
            value={form.title}
            placeholder='Enter your title here'
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='category-input'>Category</label>
          <select
            className={styles.category}
            required
            type='select'
            name='category'
            id='cateogry-input'
            value={form.category}
            onChange={handleChange}
          >
            <option value='Food'>Food</option>
            <option value='Fitness'>Fitness</option>
            <option value='BlogEntry'>Blog Entry</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='journey-input'>Journey</label>
          <select
            className={styles.journey}
            required
            type='select'
            name='journey'
            id='journey-input'
            value={form.journey}
            onChange={handleChange}
          >
            <option value="">Select Journey</option>
            {journeys.map(journey => 
              <option key={journey._id} value={journey._id}>{journey.name}</option>  
            )}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='content-input'>Post</label>
          <textarea
            required
            rows={5}
            cols={30}
            name='content'
            id='content-input'
            value={form.content}
            placeholder='Enter your post here'
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          {photoData ?
            <label htmlFor="photo-input" className={styles.photoInput}>Photo Added</label>
            :
            <label htmlFor="photo-input" className={styles.photoInput}>Add a Photo</label>
          }
          <input
            type='file'
            name='photo'
            id='photo-input'
            onChange={handleChangePhoto}
          />
        </div>
        <div>
          <button>Submit Post</button>
        </div>
      </form>
    </main>
  )
}

export default NewPost
