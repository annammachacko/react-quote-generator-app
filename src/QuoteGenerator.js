import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const backgroundImages = [
    "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/735812/pexels-photo-735812.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/237321/pexels-photo-237321.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1448136/pexels-photo-1448136.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1758147/pexels-photo-1758147.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/368260/pexels-photo-368260.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1707215/pexels-photo-1707215.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2131614/pexels-photo-2131614.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/751373/pexels-photo-751373.jpeg?auto=compress&cs=tinysrgb&w=600",
];

function QuoteGenerator() {
    const [quote, setQuote] = useState({});
    const [background, setBackground] = useState('');
    const [quotesArray, setQuotesArray] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuotes();
        setBackground(getRandomBackground());
    }, []);

    const fetchQuotes = async () => {
        try {
            const response = await fetch('https://dummyjson.com/quotes');
            const data = await response.json();
            setQuotesArray(data.quotes || []); 
            generateRandomQuote(data.quotes || []); 
            setLoading(false); 
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
            setLoading(false); 
        }
    };

    const generateRandomQuote = (quotes) => {
        if (quotes && quotes.length > 0) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote);
            setBackground(getRandomBackground());
        }
    };

    const toggleFavorite = () => {
        if (favorites.includes(quote)) {
            setFavorites(favorites.filter((fav) => fav !== quote));
        } else {
            setFavorites([...favorites, quote]);
        }
    };

    const getRandomBackground = () => {
        return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    };

    return (
        <div className="quote-app" style={{ backgroundImage: `url(${background})` }}>
            <div className="content">
                <h1>Random Quotes Generator</h1>
                <div className="quote-box">
                    {loading ? (
                        <p className="quote-text">Loading...</p>
                    ) : (
                        <>
                            <p className="quote-text">{quote.quote ? `"${quote.quote}"` : 'No quote available.'}</p>
                            <p className="quote-author">{quote.author ? `- ${quote.author}` : 'Unknown'}</p>
                        </>
                    )}
                </div>
                <div className="button-group">
                    <button 
                        onClick={() => generateRandomQuote(quotesArray)} 
                        className="btn generate-btn"
                        disabled={loading || quotesArray.length === 0}
                    >
                        {loading ? 'Loading...' : 'Generate'}
                    </button>
                    {quote.quote && (
                        <button onClick={toggleFavorite} className={`btn favorite-btn ${favorites.includes(quote) ? 'favorited' : ''}`}>
                            <FaHeart className={`heart-icon ${favorites.includes(quote) ? 'pulse' : ''}`} />
                            {favorites.includes(quote) ? 'Unfavorite' : 'Favorite'}
                        </button>
                    )}
                    <button onClick={() => setShowFavorites(!showFavorites)} className="btn show-favorites-btn">
                        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
                    </button>
                </div>

                {showFavorites && (
                    <div className="favorites-modal">
                        {favorites.length > 0 ? (
                            favorites.map((fav, index) => (
                                <p key={index} className="quote-text">
                                    {fav.quote} - {fav.author}
                                </p>
                            ))
                        ) : (
                            <p>No favorites yet!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuoteGenerator;