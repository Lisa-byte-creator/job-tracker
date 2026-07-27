import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    company_name: '',
    role_title: '',
    date_applied: '',
    job_link: '',
    notes: ''
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  async function fetchApplications() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('date_applied', { ascending: false })

    if (error) {
      console.error('Error fetching applications:', error)
    } else {
      setApplications(data)
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
  e.preventDefault()

  const { error } = await supabase
    .from('applications')
    .insert([{ ...formData, status: 'applied' }])

  if (error) {
    console.error('Error adding application:', error)
  } else {
    setFormData({ company_name: '', role_title: '', date_applied: '', job_link: '', notes: '' })
    fetchApplications()
  }
}

async function handleDelete(id) {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting application:', error)
  } else {
    fetchApplications()
  }
}

async function handleStatusChange(id, newStatus) {
  const { error } = await supabase
    .from('applications')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('Error updating status:', error)
  } else {
    fetchApplications()
  }
}
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>HuntHub</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company name"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role title"
          value={formData.role_title}
          onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date_applied}
          onChange={(e) => setFormData({ ...formData, date_applied: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Job link (optional)"
          value={formData.job_link}
          onChange={(e) => setFormData({ ...formData, job_link: e.target.value })}
        />
        <textarea
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <button type="submit">Add application</button>
      </form>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
  <strong>{app.company_name}</strong> — {app.role_title}

  <select
  className={`status ${app.status}`}
    value={app.status}
    onChange={(e) => handleStatusChange(app.id, e.target.value)}
  >
    <option value="applied">Applied</option>
    <option value="interview">Interview</option>
    <option value="offer">Offer</option>
    <option value="rejected">Rejected</option>
  </select>

  <button onClick={() => handleDelete(app.id)}>
    Delete
  </button>
</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App