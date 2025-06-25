import './App.css'
import IPod from './IPod';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {


const [posts, setPosts] = useState()

const [episodes, setEpisodes] = useState()

useEffect(() => {
  fetch('https://angelageorge.com/wp-json/wp/v2/posts?categories=53&per_page=5')
    .then(res => res.json())
    .then((postsData) => {
      setPosts(postsData)
    })
    .catch(err => console.error('Error fetching posts:', err));


    
  fetch('https://angelageorge.com/wp-json/wp/v2/podcast?per_page=5')
    .then(res => res.json())
    .then((episodeData) => {
      setEpisodes(episodeData)
    })
    .catch(err => console.error('Error fetching episodes:', err));


  }, []);

  useEffect(() => {
  if (posts) {
    console.log("Posts updated:", posts);
  }
  if (episodes) {
    console.log("Epsides updated:", episodes);
  }
}, [posts, episodes]);

  return (
    
    <div className='main'>
      <Container>
        <Row>
            <h1 style={{textAlign:"center"}}> Welcome to The Unstagram</h1>
          </Row> 
        <Col>
          
        </Col>
        <Col>
          {
            episodes?  <IPod episodes={episodes}></IPod> : <></>
          }
        </Col>
        <footer>
            <p style={{textAlign:"center"}}>
              © Angela George 2025 <br></br>
              This website is not affliated with Meta or Instagram
            </p>
        </footer>
      </Container>
    </div>
    
  )
}

export default App
