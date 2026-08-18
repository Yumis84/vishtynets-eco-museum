window.VISHTYNETS_AUDIO_GUIDES={
  museum:{
    id:'museum',
    type:'museum',
    title:'Аудиогид по музею',
    access:{
      mode:'ui_gated',
      startsOn:'first_paid_play',
      activeHours:24,
      activationCodeValidDays:7,
      methods:['yookassa','staff_code']
    },
    halls:[
      {id:'hall-1',number:1,title:'Первый зал'},
      {id:'hall-2',number:2,title:'Второй зал'}
    ],
    tracks:[
      {
        id:'welcome',
        number:0,
        kind:'intro',
        title:'Добро пожаловать',
        description:'Короткое знакомство с музеем и аудиогидом перед началом экскурсии.',
        access:'free',
        duration:196.872,
        transcript:'Добро пожаловать в Виштынецкий эколого-исторический музей. Здесь природа, история и память Роминтской пущи соединяются в одной экскурсии. Мы предлагаем пройти музей вместе с аудиогидом: слушайте записи по порядку и двигайтесь от экспозиции к экспозиции. Это вступление доступно бесплатно. Если вам понравится формат, после него можно открыть полную экскурсию и продолжить с первой экспозиции.',
        transcriptStatus:'draft_pre_recording',
        audio:{
          publicUrl:'assets/audio/luvvoice.com-20260818-IhxBTa.mp3',
          status:'site_hosted',
          sourceFormat:'mp3',
          sourceBytes:1181232,
          sourceSha256:'eced47b1a0d05fb8e19034c1d34abf93f3c076fd342bea8414e45243dccf0a29'
        }
      },
      {
        id:'exposition-01',number:1,kind:'exposition',hall:1,hallOrder:1,title:'Экспозиция 1',description:'Первая экспозиция первого зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-02',number:2,kind:'exposition',hall:1,hallOrder:2,title:'Экспозиция 2',description:'Вторая экспозиция первого зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-03',number:3,kind:'exposition',hall:1,hallOrder:3,title:'Экспозиция 3',description:'Третья экспозиция первого зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-04',number:4,kind:'exposition',hall:1,hallOrder:4,title:'Экспозиция 4',description:'Четвёртая экспозиция первого зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-05',number:5,kind:'exposition',hall:2,hallOrder:1,title:'Экспозиция 1',description:'Первая экспозиция второго зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-06',number:6,kind:'exposition',hall:2,hallOrder:2,title:'Экспозиция 2',description:'Вторая экспозиция второго зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-07',number:7,kind:'exposition',hall:2,hallOrder:3,title:'Экспозиция 3',description:'Третья экспозиция второго зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      },
      {
        id:'exposition-08',number:8,kind:'exposition',hall:2,hallOrder:4,title:'Экспозиция 4',description:'Четвёртая экспозиция второго зала.',access:'paid',duration:null,audio:{publicUrl:null,status:'awaiting_upload'}
      }
    ]
  },
  routes:[]
};
