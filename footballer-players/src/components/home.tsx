import barcode from '../assets/images/barcode.png'
import plot from '../assets/images/plot.png'

function Home() {
    return (
        <div>
            <img src={plot} alt="plot" />
            <img src={barcode} alt="barcode" />
        </div>
    )
}

export default Home