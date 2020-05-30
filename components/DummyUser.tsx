const DummyUser = ({onClick, title}) => (
    <li key={'detail'} onClick={onClick}>
        <a className="user">
            <div className="user__name">
                <h3>{title}</h3>
            </div>
        </a>
    </li>
)
export default DummyUser