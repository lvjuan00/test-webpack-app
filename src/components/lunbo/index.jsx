import React from 'react'
import './lunbo.scss'
import $ from 'jquery'
// import img1 from '@views/question/images/img1.png'
// import img2 from '@views/question/images/img2.png'
// import img3 from '@views/question/images/img3.png'
// import img4 from '@views/question/images/img4.png'
// import iconRight from '@views/question/images/icon_left.png'
// import iconLeft from '@views/question/images/icon_right.png'
import prevImg from '@static/images/prev.png'
import nextImg from '@static/images/next.png'

import FileType from '@components/file-type'
import Aid from '@components/aid'

class Lunbo extends React.Component {
  constructor(props) {
    super(props)
    const { pics } = props
    this.state = {
      imgLength: pics.length,
      imgWidth: 184,
    }
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.changeData = this.changeData.bind(this)
  }

  componentDidMount() {
    const { imgLength, imgWidth } = this.state
    this.imgLength = imgLength
    // this.imgWidth = this.$lunboInner.find('.file-type:first').width()
    this.$lunboInner.css({ width: this.imgLength * (imgWidth + 10) })
  }

  prev() {
    const { imgWidth } = this.state
    this.$lunboInner.prepend(this.$lunboInner.find('.file-type')[this.imgLength - 1]);
    this.$lunboInner.css({
      left: -(imgWidth + 10) + 'px',
    })
    this.$lunboInner.stop().animate({
      left: 0,
    }, 300)
  }

  next() {
    const { imgWidth } = this.state
    this.$lunboInner.stop().animate({
      left: -(imgWidth + 10) + 'px',
    }, 300, () => {
      this.$lunboInner.append(this.$lunboInner.find('.file-type')[0]);
      this.$lunboInner.css({
        left: 0,
      })
    })
  }

  changeData(pics) {
    const newPics = []
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].video || pics[i].instruction) {
        newPics.push(pics[i])
      } else if (pics[i].name) {
        newPics.push(pics[i])
      }
    }
    return newPics
  }

  render() {
    const { pics } = this.props
    // console.log(pics, pics)
    return (
      <div className="lub-container">
        {this.changeData(pics).length > 2 && (
        <span className="lub-prevBtn" onClick={this.prev}>
          <img src={prevImg} alt="left" />
        </span>)}
        <div className="lub-wrap">
          <div
            className="lub-inner"
            ref={(el) => {
              this.$lunboInner = $(el)
            }}
          >
            {/* <img src={img1} alt="img" className="lunbo-img" />
            <img src={img2} alt="img" className="lunbo-img" />
            <img src={img3} alt="img" className="lunbo-img" />
            <img src={img4} alt="img" className="lunbo-img" /> */}
            {
              pics && this.changeData(pics).map((item) => {
                return (
                  item.name ? <FileType
                    file={item}
                  /> : <Aid file={item} />
                )
              })
            }
          </div>
        </div>
        {this.changeData(pics).length > 2 && (
          <div className="lub-nextBtn" onClick={this.next}>
            <img src={nextImg} alt="right" />
          </div>)}
      </div>
    )
  }
}

export default Lunbo
