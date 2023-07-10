import StarRating from "react-native-star-rating";

export const StarsRating = (props) => {
    const {rating, setRating, ...rest} = props
    return <StarRating {...rest}
               maxStars={5}
               rating={rating}
               selectedStar={(r)=> setRating(r)}
               fullStarColor={"#deb40b"}
    />
}
