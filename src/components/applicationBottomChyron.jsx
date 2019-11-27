import React, { Component } from "react";

class ApplicationBottomChyron extends Component {
  state = {
    chyronIntervalId: "",
    newsTickers: [
      "Ab, enim quasi. Dolor soluta natus quod vel aliquam aperiam delectus Ab, enim quasi. Dolor soluta natus quod vel aliquam aperiam delectus!",
      "Exercitationem laudantium odit possimus aperiam quam enim molestias earum eaque? ",
      "Harum laborum ducimus quos dolor alias officiis nam, est illum dolorum quisquam tempore, corporis inventore.",
      "Ut totam dicta quia dolore animi, ad neque corporis laboriosam cum quaerat vero repellendus sint."
    ],
    newsTickerIndexes: { currentIndex: 0, newIndex: 0 }
  };

  componentDidMount() {
    this.newsTickerResize();

    const chyronIntervalId = setInterval(() => {
      this.newsTickerLooper();
    }, 10000);

    this.setState({ chyronIntervalId });

    window.addEventListener("resize", () => {
      this.newsTickerResize();
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.chyronIntervalId);
  }

  newsTickerLooper = () => {
    const { newsTickers, newsTickerIndexes } = this.state;

    let currentIndex = newsTickerIndexes.currentIndex;
    const newIndex =
      currentIndex + 1 === newsTickers.length ? 0 : parseInt(currentIndex) + 1;
    newsTickerIndexes.currentIndex = newIndex;
    newsTickerIndexes.newIndex = newIndex;
    newsTickerIndexes.hideIndex = currentIndex;

    let li = document.querySelectorAll("ul.scrollerUl li");
    if (!li[currentIndex]) return;
    li[currentIndex].className = "news-ticker-slide-out";
    li[newIndex].className = "news-ticker-slide-in";
  };

  scrollPageTop = () => {
    window.scrollTo({
      top: 85,
      behavior: "smooth"
    });
  };

  newsTickerResize = () => {
    const newsScroller = document.querySelector(".news-scroller").clientWidth;
    const header = document.querySelector(".news-scroller .header").clientWidth;
    const pageUp = document.querySelector(".news-scroller .scroll-page-up")
      .clientWidth;

    const scrollerLi = document.querySelectorAll("ul.scrollerUl li");
    const width = newsScroller - (header + pageUp + 5);

    for (let i = 0; i < scrollerLi.length; i++) {
      scrollerLi[i].style.width = width + "px";
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="bottom-chyron">
          <div className="news-scroller">
            <div className="header">News</div>

            <div className="scroller">
              <ul className="scrollerUl">
                {this.state.newsTickers.map((n, index) => (
                  <li className="scrollerLi" key={index}>
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="scroll-page-up" onClick={this.scrollPageTop}>
              <i className="fa fa-caret-up"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ApplicationBottomChyron;
