import "./styles.css";
import { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.com/react-tabs-project";

export default function App() {
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setTabs(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <section>{loading && <h1>Loading....</h1>}</section>;
  }

  const { company, dates, duties, title } = tabs[value];

  return (
    <>
      <main>
        <h1 className="title">Experience</h1>
        <section className="grid">
          <article className="button-groups">
            {/* Button group */}
            {tabs.map((e, index) => {
              return (
                <button
                  key={index}
                  className={`btn ${index === value && "btn-active"}  `}
                  onClick={() => setValue(index)}
                >
                  {e.company}
                </button>
              );
            })}
          </article>
          <article>
            <h1 className="heading">{title}</h1>
            <h2 className="company">{company}</h2>
            <p className="dates">{dates}</p>

            {duties.map((e, index) => {
              return (
                <p className="text" key={index}>
                  <FaAngleDoubleRight className="arrow" /> {e}
                </p>
              );
            })}
          </article>
        </section>
        <section className="footer">
          <button className="footer-btn">more info</button>
        </section>
      </main>
    </>
  );
}
