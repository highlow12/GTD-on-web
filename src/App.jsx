import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState('')

  // 작업 목록 불러오기
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      alert('작업을 불러오는 중 오류가 발생했습니다: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // 새 작업 추가
  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title: newTask, status: 'inbox' }])
        .select()
      
      if (error) throw error
      setTasks([...data, ...tasks])
      setNewTask('')
    } catch (error) {
      console.error('Error adding task:', error)
      alert('작업 추가 중 오류가 발생했습니다: ' + error.message)
    }
  }

  // 작업 상태 변경
  const updateTaskStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id)
      
      if (error) throw error
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      ))
    } catch (error) {
      console.error('Error updating task:', error)
      alert('작업 상태 변경 중 오류가 발생했습니다: ' + error.message)
    }
  }

  // 작업 삭제
  const deleteTask = async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('작업 삭제 중 오류가 발생했습니다: ' + error.message)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      inbox: '#fbbf24',
      next: '#3b82f6',
      waiting: '#8b5cf6',
      someday: '#6b7280',
      done: '#10b981'
    }
    return colors[status] || '#6b7280'
  }

  const statusLabels = {
    inbox: '📥 받은편지함',
    next: '▶️ 다음',
    waiting: '⏳ 대기',
    someday: '💭 언젠가',
    done: '✅ 완료'
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>GTD on Web</h1>
      
      {/* 새 작업 추가 폼 */}
      <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="새 작업 입력..."
          style={{
            width: '70%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            width: '28%',
            marginLeft: '2%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          추가
        </button>
      </form>

      {/* 작업 목록 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          아직 작업이 없습니다. 위에서 작업을 추가해보세요!
        </p>
      ) : (
        <div>
          <h3>작업 목록 ({tasks.length}개)</h3>
          {tasks.map(task => (
            <div
              key={task.id}
              style={{
                backgroundColor: '#f9fafb',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
                borderLeft: `4px solid ${getStatusColor(task.status)}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{task.title}</h4>
                  {task.description && (
                    <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                      {task.description}
                    </p>
                  )}
                  <div style={{ marginTop: '10px' }}>
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      style={{
                        padding: '5px 10px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white'
                      }}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        marginLeft: '10px',
                        padding: '5px 15px',
                        fontSize: '14px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
