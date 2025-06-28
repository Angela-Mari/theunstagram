import Container from "react-bootstrap/Container"
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import header from './assets/blogging.gif';
import './Blog.css';

function Blog({posts}) {

    return (
    <Container className="blogContainer">
        <Row>
            <Col className='text-center'>
                <img src={header} alt="blog gif" width="200px"/>
            </Col>
        </Row>
        <Row>
          <Col>
          
            {Object.entries(posts).map(([key, post]) => (
                 <a href={post.link}>
                    <p dangerouslySetInnerHTML={{ __html: post.title.rendered }}/>
                </a>
        ))}
          
        </Col>
        </Row>
    </Container>
    )
}
export default Blog
