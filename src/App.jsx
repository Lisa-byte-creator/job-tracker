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
      <header>
      <h1>HuntHub</h1>
      <p>Track and manage your job applications</p>
      </header>

      <section className="stats">

    <section className='stat-card'>

      <h5>Total</h5>
      <h4>{applications.length}</h4>


    </section>

     <section className='stat-card'>
      <h5>Applied</h5>
      <h4>{applications.filter(app => app.status === "applied").length}</h4>
      
    </section>

     <section className='stat-card'>
      <h5>Interview</h5>
      <h4>{applications.filter(app => app.status === "interview").length}</h4>

      
    </section>

     <section className='stat-card'>

      <h5>Rejected</h5>
      <h4>{applications.filter(app => app.status === "rejected").length}</h4>

    </section>

      <section className='stat-card'>

      <h5>Offer</h5>
      <h4>{applications.filter(app => app.status === "offer").length}</h4>

    </section>

</section>
<main>
<section className="card">
      <h4>Add an Application</h4>
<section className ="add-an-application">
      <form className='application-form' onSubmit={handleSubmit}>
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
        <textarea className='Notes'
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <button className='submitting' type="submit">Add application</button>
      </form>
      </section>
</section>


<section className="card">
<h4>My Applications</h4>
<section className = "my-applications">
    
 
      {applications.length === 0 ? (
        <p>No job applications yet.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li className="application-card" key={app.id}>
  <h3>{app.company_name}</h3>

  <p>{app.role_title}</p>

    <p>Date Applied: {app.date_applied}</p>

    {app.job_link && (
  <p>
    <a
      href={app.job_link}
      target="_blank"
      rel="noopener noreferrer"
    >
      🔗 View Job
    </a>
  </p>
)}

  <div className="application-actions">
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
  </div>
</li>
          ))}
        </ul>
      )}
      </section>
      </section>
    
      </main>
</div>
  )
  
}


export default App