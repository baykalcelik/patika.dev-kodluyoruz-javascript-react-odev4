import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from './App';



test('Başlık kısmı render edil di mi ?', ()=>{
  render(<App/>);
  const linkElement = screen.getByText('Emoji Search');
  expect(linkElement).toBeInTheDocument;

});





test(' Emoji Listesi Eklendi mi ?', () => {
  const {container} = render(<App />);
  const boxes = container.getElementsByClassName('component-emoji-results');
  expect(boxes[0].children.length).toBeGreaterThan(0);

});






test('Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde yeniden render edildiğini kontrol edecek olan test kodunu yazın.', async () => {
  const {container} = render(<App />);
  const listcontainer = container.getElementsByClassName('component-emoji-results');

  const emojiinput = container.getElementsByClassName('component-search-input')[0].firstChild.firstChild;
  await userEvent.type(emojiinput, 'age');

  let checkamount = 0;
  let totaladdedrecordfromjson = listcontainer[0].children.length;
  // console.log("toplam kayıt sayısı : ", totaladdedrecordfromjson);

  for(let x = 0; x < totaladdedrecordfromjson; x++){     
      if(listcontainer[0].children[x].children[1].innerHTML.includes('age')){
          checkamount++;
      } 

  }

  // if(checkamount !== totaladdedrecordfromjson ){
  //     console.log("age içerenler haricinde kayıt çıktı.");
  // }else{
  //     console.log("kayıtların hepsi age kelimesini içeriyor. ");
  // }
  // console.log("kontrolde bulunan -age- içeren kayıt sayısı : ", checkamount);
  // console.log("sistemin  : ", totaladdedrecordfromjson);
  

  expect(totaladdedrecordfromjson - checkamount).toBe(0);


});





 
test('Liste üzerinden herhangi emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol edecek olan test kodunu yazın. ?', async () => {
    
    const user = userEvent.setup();

    const {container} = render(<App />);

    const listitem = container.getElementsByClassName('component-emoji-results')[0];
      let statecontrol = true;

    for(let x = 0; x < listitem.children.length; x++){
      listitem.children[x].addEventListener('click',(e)=>{
        navigator.clipboard.writeText(listitem.children[x].getAttribute('data-clipboard-text'));
      });
      await userEvent.click(listitem.children[x]);
      const clipboardText = await navigator.clipboard.readText();
      if(listitem.children[x].getAttribute('data-clipboard-text') !== clipboardText) statecontrol = false;

    }

    expect(statecontrol).toBeTruthy();

  });

  



 