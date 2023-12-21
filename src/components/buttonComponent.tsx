import { Button } from "@mui/material"

type ButtonProps = {
    backgroundColor : string,
    fontSize : number,
    text : string
}
const ButtonComponent = ({ backgroundColor, fontSize, text} : ButtonProps) => {
    return(
        <Button variant="contained">{text}</Button>
    )
}

