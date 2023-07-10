import StarRating from 'react-native-star-rating-widget';

export const StarsRating = (props) => {
    const {rating, setRating, ...rest} = props
    return <StarRating {...rest}
               maxStars={5}
               rating={rating}
               onChange={(r)=> setRating(r)}
               color={"#deb40b"}
               enableHalfStar={false}
    />
}
