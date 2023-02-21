import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import placedispo from '../assets/images/placedispo.png'
import Admincards from '../assets/css/Admincards.css'
import duree from '../assets/images/duree.png'
import cout from '../assets/images/cout.png'
import classement1 from '../assets/images/classement1.png'
import classement2 from '../assets/images/classement2.png'
import rentable from '../assets/images/rentable.png'
import Navbar from '../components/Navbar';
import LogoutButton from '../components/LogoutButton';
export default function AdminCards() {
  return (
    <div className='admincards'>
    <LogoutButton/>
      <Card style={{ width: '18rem', height: '22rem' }}>
        <Card.Img variant="top" src={placedispo} className="imagecard" />
        <Card.Body>

          <Card.Text>
            Moyenne du nombre de places disponibles par parking
          </Card.Text>
          <a href='http://localhost:3000/AvailableSpace'>
          <Button className='buttoncard'>Découvrir</Button>
          </a>
        </Card.Body>
      </Card>


      <Card style={{ width: '18rem', height: '22rem' }}>
        <Card.Img variant="top" src={duree} className="imagecard" />
        <Card.Body>
          <Card.Text>
            La durée moyenne de stationnement d'un véhicule par parking
          </Card.Text>
          <a href='http://localhost:3000/list'>
            <Button className='buttoncard'>Découvrir</Button>
          </a>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem', height: '22rem' }}>
        <Card.Img variant="top" src={cout} className="imagecard" />
        <Card.Body>
          <Card.Text>
            Le coût moyen du stationnement d'un véhicule par mois
          </Card.Text>
          <a href='http://localhost:3000/stationnement'>
          <Button className='buttoncard'>Découvrir</Button>
          </a>
        </Card.Body>
      </Card>



      <Card style={{ width: '18rem', height: '22rem' }}>
        <Card.Img variant="top" src={classement1} className="imagecard" />
        <Card.Body>
          <Card.Text>
            Classement des parkings les moins utilisés
          </Card.Text>
          <a href='http://localhost:3000/rank-parking'>
          <Button className='buttoncard'>Découvrir</Button>
          </a>
        </Card.Body>
      </Card>



      <Card style={{ width: '18rem', height: '22rem' }}>
        <Card.Img variant="top" src={rentable} className="imagecard" />
        <Card.Body>
          <Card.Text>
            Classement des parking les plus rentables par commune et par mois
          </Card.Text>
          <a href='http://localhost:3000/communes'>
          <Button className='buttoncard'>Découvrir</Button>
          </a>
        </Card.Body>
      </Card>



      <Card style={{ width: '18rem', height: '22rem' }}>
        <Card.Img variant="top" src={classement2} className="imagecard" />
        <Card.Body>
          <Card.Text>
            Classement des communes les plus demandées par semaine
          </Card.Text>
          <a href='http://localhost:3000/commune/semaine'>
          <Button className='buttoncard'>Découvrir</Button>
          </a>
        </Card.Body>
        
      </Card>



    </div>
  )
}
