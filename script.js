const containers = [
 document.getElementById('pool'),
 document.getElementById('rank1'),
 document.getElementById('rank2'),
 document.getElementById('rank3'),
 document.getElementById('rank4')
];

containers.forEach(el=>{
 new Sortable(el,{
   group:'shared',
   animation:150
 });
});
