let dotTimer=null;
function startDots(){
  const d=document.getElementById('dots');
  let n=1;
  d.textContent='.';
  dotTimer=setInterval(()=>{n=(n%3)+1;d.textContent='.'.repeat(n);},420);
}
function stopDots(){
  clearInterval(dotTimer);
  document.getElementById('dots').textContent='';
}

function isValidDateInputs(day,month){
  if(!Number.isFinite(day)||!Number.isFinite(month))return false;
  if(month<1||month>12)return false;
  const year=new Date().getFullYear();
  const daysInMonth=new Date(year,month,0).getDate();
  return day>=1&&day<=daysInMonth;
}

function tinhO(){
  const dayEl=document.getElementById('day');
  const monthEl=document.getElementById('month');
  const loading=document.getElementById('loading');
  const result=document.getElementById('result');
  const placeholder=document.getElementById('imagePlaceholder');

  const day=parseInt(dayEl.value,10);
  const month=parseInt(monthEl.value,10);

  result.style.opacity=0;
  result.textContent='';
  placeholder.style.display='none';
  placeholder.style.opacity=0;

  if(!isValidDateInputs(day,month)){
    result.style.opacity=1;
    result.style.color='#8b0000';
    result.textContent='Ngày tháng không hợp lệ!';
    return;
  }

  loading.style.display='block';
  startDots();

  setTimeout(()=>{
    stopDots();
    loading.style.display='none';

    const weights=[1,2,1,2,1,2,1,2];
    let total=0,idx=0;
    while(true){
      total+=weights[idx];
      if(total>=month)break;
      idx=(idx+1)%8;
    }
    const finalIndex=(idx+(day-1))%8;
    const cell=finalIndex+1;

    const names=["Sinh","Chấn","Tốn","Ly","Khôn","Đoài","Càn","Hưu"];
    const goodBad=["tốt","xấu","xấu","tốt","xấu","xấu","tốt","xấu"];
    const state=goodBad[finalIndex];
    const name=names[finalIndex];

    const color=state==='tốt'?'#065f46':'#7b1a1a';
    result.style.color=color;
    result.innerHTML=`Kết quả: <strong>${name}</strong> — (<span style="color:${color}">${state}</span>)<br><small style="color:var(--muted)">Vị trí ô: ${cell} (bạn có thể xem hình minh họa bên dưới)</small>`;
    result.style.opacity=1;

    // Hiện khu vực hình minh họa
    setTimeout(()=>{
      placeholder.style.display='block';
      requestAnimationFrame(()=>{placeholder.style.opacity=1;});
    },400);

  },900);
}
