window.VISHTYNETS_AUDIO_GUIDES={
  museum:{
    id:'museum',
    type:'museum',
    title:'Аудиогид по музею',
    access:{
      mode:'paid',
      startsOn:'first_play',
      activeHours:24,
      activationCodeValidDays:7,
      methods:['yookassa','staff_code']
    },
    tracks:[
      {
        id:'exposition-01',
        number:1,
        title:'Экспозиция 1',
        description:'Первая аудиозапись музейного аудиогида.',
        duration:873,
        preview:{
          seconds:5,
          mime:'audio/webm;codecs=opus',
          global:'VISHTYNETS_EXPOSITION_01_SAMPLE_B64'
        },
        fullAudio:{
          delivery:'protected',
          publicUrl:null
        }
      }
    ]
  },
  routes:[]
};
