import { ProTable } from '@ant-design/pro-components'
import { Alert, Button, DatePicker, Input } from 'antd'
import todos from './todos'
import columns from './columns'
import React, { useEffect, useState, useRef } from 'react'

const TodoList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [todoList, setTodo] = useState([...todos]);

    const todoTitleRef = useRef()
    
    let _dateString = ''
    
    useEffect(() => {
      const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
      if (storedTodoList) setTodo(storedTodoList);
    }, []);

    useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList))
    }, [todoList, columns])

    useEffect(() => {
      _dateString = ''
    }, [_dateString])

    const dateGetter = (date, dateString) => {
      _dateString = dateString
    } 

    const addTodo = () => {
        const newTodo = {
          key: Math.floor(Math.random() * 100),
          title: todoTitleRef.current.input.value,
          deadline: _dateString,
        };
        setTodo(pre => {
            return [...pre, newTodo]
        })
    }

    const deleteTodo = () => {
        setTodo(pre => {
          console.log(pre);
          return pre.filter(todo => !selectedRowKeys.includes(todo.key))
        })
        setSelectedRowKeys(pre => {
          return pre.filter(() => !selectedRowKeys)
        })
    }

    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('SelectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const hasSelected = selectedRowKeys.length > 0

    return (
      <div>
        <div style={{ marginLeft: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Input style={{maxWidth: 400}} placeholder={'Todo Body'} type={'text'} ref={todoTitleRef}></Input>
          <DatePicker style={{maxWidth: 150}} placeholder={'Deadline'} onChange={dateGetter}></DatePicker>
          <Button type="primary" onClick={addTodo}>
            Add
          </Button>
          <Button type="danger" disabled={!hasSelected} onClick={deleteTodo}>
            Delete
          </Button>
          <span>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
        </div>
        <ProTable
          search={false}
          tableAlertRender={false}
          tooltip={false}
          // Temp
          headerTitle="Todo List"
          dataSource={todoList}
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          pagination={{
            defaultPageSize: '5',
          }}
        />
      </div>
    );
}


export default TodoList