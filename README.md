# Inlines

When you just want to use the inline style prop in React.

Uses inline styles where possible, uses dynamic stylesheets for the rest.

## For example

```jsx
import { styled } from 'inlines'

const App = () => {
  return (
    <styled.div
      style={{
        border: '10px solid purple',
        background: 'yellow',
        '@media (min-width: 600px)': {
          background: 'hotpink'
        },
        '@keyframes': {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }}
    >
      <div
        style={{
          marginBottom: 8
        }}
      >
        Just use normal elements when you can
      </div>
      <styled.input
        placeholder="Wow I'm orange"
        style={{
          border: '1px solid blue',
          '&::placeholder': {
            color: 'orange'
          }
        }}
      />
      <styled.button
        style={{
          border: '1px solid red',
          '&:hover': {
            background: 'yellow'
          },
          '&:active': {
            background: 'red'
          }
        }}
      >
        Look I'm a button
      </styled.button>
    </styled.div>
  )
}

export default App
```

Or use styled as a function if you prefer:

```jsx
import { styled } from 'inlines'

const Container = styled('div', {
  border: '10px solid purple',
  background: 'yellow',
  '@media (min-width: 600px)': {
    background: 'hotpink'
  },
  '@keyframes': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
})

const Input = styled('input', {
  border: '1px solid blue',
  '&::placeholder': {
    color: 'orange'
  }
})

const Button = styled('button', {
  border: '1px solid red',
  '&:hover': {
    background: 'yellow'
  },
  '&:active': {
    background: 'red'
  }
})

const App = () => {
  return (
    <Container>
      <div
        style={{
          marginBottom: 8
        }}
      >
        Just use normal elements when you can
      </div>
      <Input placeholder="Wow I'm orange" />
      <Button>Look I'm a button</Button>
    </Container>
  )
}

export default App
```
