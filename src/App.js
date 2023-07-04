import { styled, keyframes } from 'styled-components';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [count, setCount] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  function addTodo() {
    if (todo) {
      const newTodo = {
        todo: todo,
        created: new Date().toLocaleString(undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        last_updated: new Date().toLocaleString(undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        modified: false,
        status: 'marked'
      };

      setTodoList([...todoList, newTodo])
      setTodo('')
      setCount(count + 1)

    }
  }

  const handlePressEnter = event => {
    if (event.key === 'Enter') {
      addTodo();
    }
  }

  const deleteTodo = (index) => {
    setTodoList(prevtodoList => prevtodoList.filter((_, i) => i !== index))
  }

  const startEditing = (index) => {
    setEditingTask(index);
  };

  return (
    <Container>
      <Box>
        <Row>
          <Title>Todo-List by <span style={{ color: "#B7CE63" }}>@ogomesdev</span> </Title>
        </Row>
        <Row>
          <Subtitle>
            Apenas um projeto para treinar React e Styled Components
          </Subtitle>
        </Row>
        <Content>
          <InputBox placeholder='digite uma task aqui' value={todo} onChange={event => setTodo(event.target.value)} onKeyDown={handlePressEnter}
          >
          </InputBox>
          <AddIcon onClick={addTodo}>
            <AiOutlinePlus size={24} color='white' />
          </AddIcon>
        </Content>
        <TaskContainer>
          {todoList && todoList.map((item, index) => (
            <Task key={index} delay={index * 0.1}>
              {editingTask === index ? (
                <EditTaskInput
                  value={item.todo}
                  onChange={(event) => {
                    const updatedTodoList = [...todoList];
                    updatedTodoList[index].todo = event.target.value;
                    updatedTodoList[index].last_updated = new Date().toLocaleString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    setTodoList(updatedTodoList);
                  }}
                  onBlur={() => setEditingTask(null)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setEditingTask(null);
                    }
                  }}
                />
              ) : (
                <TaskText>
                  <TaskTitle>{item.todo}</TaskTitle>
                  <TaskSubtitle>
                    <span>Atualizado em: {item.last_updated}</span>
                  </TaskSubtitle>
                </TaskText>
              )}
              <TaskIcons>
                <AiFillEdit
                  size={24}
                  style={IconStyles.editIcon}
                  onClick={() => startEditing(index)}
                />
                <AiFillDelete
                  size={24}
                  style={IconStyles.deleteIcon}
                  onClick={() => deleteTodo(index)}
                />
              </TaskIcons>
            </Task>
          ))}
        </TaskContainer>
      </Box>
    </Container>
  );
}


export default App;


const IconStyles = {
  editIcon: {
    margin: 3,
    color: "#b7ce63",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 20,
  },
  deleteIcon: {
    margin: 3,
    color: "#ef233c",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 20
  }
}


const Container = styled.div`
width: 100%;
height: 100vh;
background: rgb(238,174,202);
background-image: linear-gradient(to right top, #0052cf, #008fff, #00bcdf, #00e088, #acf508);
display: flex;
justify-content: center;
align-items:center;
`

const Box = styled.div`
width: 500px;
height: 85%;
border-radius: 14px;
background-color: #131515;
padding: 1em;
border: 3px solid #B7CE63;
`
const Row = styled.div`
width: 100%;
height: 30px;
`

const Title = styled.h1`
font-family: 'Kanit', sans-serif;
color: white;
line-height: 28px;
text-align:right;
padding: 20px;
`

const Subtitle = styled.p`
font-size: 14px;
text-align:right;

padding: 10px 20px 10px 20px;
color: rgba(255,255,255,0.6)
`

const Content = styled.div`
width: 100%;
margin-top: 30px;
display: flex;
justify-content:center;
align-items:center;
`
const EditTaskInput = styled.input`
  width: 70%;
  padding: 5px;
  font-family: 'Kanit', sans-serif;
  font-size: 24px;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
`;
const InputBox = styled.input`
width: 70%;
height: 40px;
letter-spacing: 1px;
font-family: 'Kanit', sans-serif;
background-color: #2B2C28;
outline: none;
border: 1px solid #2b2c28;
padding: 7px 15px 7px 15px;
border-radius: 12px;
color: rgba(255,255,255,0.8);
transition: .5s ease all;
&:focus {
  border: 1px solid #B7CE63;
border-radius: 2px;


}
`


const AddIcon = styled.div`
width: 35px;
height: 35px;
padding: 10px;
border-radius: 10px;
background-color: #2B2C28;
border: 1px solid #2B2C28;
margin: 0px 0px 0px 10px;
display: flex;
justify-content:center;
align-items:center;
cursor: pointer;
transition: .5s ease all;
&: hover{
  border: 1px solid #B7CE63;
  border-radius: 2px;
}
`
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Task = styled.div`
opacity: 0;
  animation: ${fadeIn} 0.4s ease-out forwards;
  animation-delay: ${props => props.delay}s;
width: 85%;
height:70px;
display:flex;
padding: 10px;
background-color: #2B2C28;
border-radius: 10px;
cursor: pointer;
border: 1px solid #2B2C28;
margin-top: .7em;
transition: .3s ease all;
&:hover{
  border: 1px solid #B7CE63;
  border-radius: 2px;
}
`

const TaskContainer = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items:center;
margin-top: 1em;


`

const TaskTitle = styled.h2`
margin: 0px;
font-size: 24px;
font-family: 'Kanit', sans-serif;
color: white;
line-height:30px;
`

const TaskSubtitle = styled.p`
color: rgba(255,255,255,0.7);
font-size: 14px;
margin: 0px;
`

const TaskText = styled.div`
width: 70%;
height: 100%;
display:flex;
flex-direction:column;
justify-content:center;
`

const TaskIcons = styled.div`
width: 30%;
height: 100%;
display:flex;
justify-content:center;
align-items:center;
`
