import "./Dialog.css";

export default function Dialog(props) {
    const { name, yesCb, noCb } = props;

    return (
        <div className="dialog">
            <div className="backdrop">
                <h1>{name}</h1>
                <p className="btn5">
                    <button className="buttonDialog" onClick={yesCb}>
                        Yes
                    </button>
                    <button className="buttonDialog" onClick={noCb}>
                        No
                    </button>
                </p>
            </div>
        </div>
    );
}
