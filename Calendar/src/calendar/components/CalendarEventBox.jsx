

export const CalendarEventBox = ({ event }) => {
    const {title, user} = event;

    return(
        <>
            <strong style={{fontSize: "10px"}} >{title}</strong>
            <span style={{fontSize: "8px"}}> - {user.name}</span>
        </>
    )
}