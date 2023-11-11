import "./Dialog.css";

export default function Dialog(props) {
    const { name, yesCb, noCb } = props;

    return (
        <div className="backdrop">
            <h1 className="confirm_title">{name}</h1>
            <p className="btn5">
                <button className="buttonDialog" onClick={yesCb}>
                    Yes
                </button>
                <button className="buttonDialog" onClick={noCb}>
                    No
                </button>
            </p>
        </div>
    );
}
