import "./About.css";
import logo from "../Image/istockphoto-1371309559-1024x1024.jpg";

export default function About() {
    return (
        <div className="about">
            <div className="about_title">
                <img src={logo} alt="" className="logo_about" />
                <h1 className="title_about">About</h1>
            </div>

            <div className="about_info">
                <p>
                    Lion Leather Craft started off in 2017 on the corner of
                    Bianca and Adrian dining room table. Back then it was just
                    an experiment to see if Bianca could make a simple laptop
                    sleeve. Instead of making just one, he made six or seven -
                    each iteration got better and better.
                </p>
                <p>
                    We often say "this was a curiosity that turned into a hobby,
                    morphed into a business and developed into a brand."
                </p>
                <p>
                    Though our operation is still small and lean, we've been
                    able to continuously produce large volumes of our own
                    branded line of leather goods, as well as manufacture
                    white-labeled and co-branded goods for a growing list of
                    clients and customers. We're definitely on the move. Our
                    product philosophy is to keep things simple.{" "}
                </p>
            </div>
        </div>
    );
}
