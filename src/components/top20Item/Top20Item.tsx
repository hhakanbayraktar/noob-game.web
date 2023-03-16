import "./Top20Item.scss"

const Top20Item = () => {
  return (
    <div className='top20-item col-xl-3'>
        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co2gn3.png" alt="" />
        
        <div className="body">
          <div className="rate">
            87%
          </div>
          <div className="game">
            <div className="name">Hogwarts Legacy</div>
            <div className="type">Adventure</div>
          </div>
        </div>
    </div>
  )
}

export default Top20Item