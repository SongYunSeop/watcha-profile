const DummyContent = ({onClick, title}) => (
    <li key={'detail'} onClick={onClick}>
        <a className="content">
            <div className="content__top">
                <div className="content__name">
                    <h3>{title}</h3>
                </div>
            </div>
        </a>
    </li>
)
export default DummyContent