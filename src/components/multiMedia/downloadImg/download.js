// // 调用方式
// // 参数一： src
// // 参数二： 图片名称，可选
// export const downloadImage = (src) => {
//   // const src = 'http://pic.c-ctrip.com/VacationH5Pic/mice/wechat/ewm01.png'
//   // const src = 'http://course365.oss-cn-shanghai.aliyuncs.com/release%2Ftupian%2F201861%2F4bbdb660211fc0cabb9a56b01c5d3471.jpg'
//   const canvas = document.createElement('canvas')
//   const img = document.createElement('img')
//   img.onload = () => {
//     canvas.width = img.width
//     canvas.height = img.height
//     const context = canvas.getContext('2d')
//     context.drawImage(img, 0, 0, img.width, img.height)
//     // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
//     // saveAs(imageDataUrl, '附件');
//     canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
//     canvas.toBlob((blob) => {
//       const link = document.createElement('a')
//       link.href = window.URL.createObjectURL(blob)
//       link.download = 'aaa'
//       link.click()
//     }, 'image/jpeg')
//     // context.toBlob(function(blob) {
//     // console.log('blob :', blob);
//     // let link = document.createElement('a');
//     // link.href = window.URL.createObjectURL(blob);
//     // link.download = 'aaa';
//     // }, "image/jpeg");
//   }
//   img.setAttribute('crossOrigin', 'Anonymous')
//   img.src = src
// }
//
// export default (src) => {
//   const canvas = document.createElement('canvas');
//   const img = document.createElement('img');
//   img.onload = function () {
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const context = canvas.getContext('2d');
//     context.drawImage(img, 0, 0, img.width, img.height);
//     window.navigator.msSaveBlob(canvas.msToBlob(), 'image.jpg');
//   }
//   img.src = src;
// }
