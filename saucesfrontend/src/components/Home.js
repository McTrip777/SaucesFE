import React from 'react'
import img1 from '../img/img1.jpg'
// import img2 from '../img/img2.jpg'
// import img3 from '../img/img3.jpg'
import img4 from '../img/img4.jpg'

const imgArr = [img1, img4]

const Home = () => {
    const randomImg = (arr) => {
        let num = Math.floor(Math.random() * arr.length)
        return arr[num]
    }
    return (
        <div className="home-container">
            <img src={randomImg(imgArr)} />
        </div>
    )
}

export default Home
