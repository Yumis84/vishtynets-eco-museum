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
    tracks:[
      {
        id:'welcome',
        number:0,
        kind:'intro',
        title:'Добро пожаловать',
        description:'Короткое знакомство с музеем и аудиогидом перед началом экскурсии.',
        access:'free',
        duration:null,
        transcript:'Добро пожаловать в Виштынецкий эколого-исторический музей. Здесь природа, история и память Роминтской пущи соединяются в одной экскурсии. Мы предлагаем пройти музей вместе с аудиогидом: слушайте записи по порядку и двигайтесь от экспозиции к экспозиции. Это вступление доступно бесплатно. Если вам понравится формат, после него можно открыть полную экскурсию и продолжить с первой экспозиции.',
        audio:{
          publicUrl:null,
          status:'awaiting_recording'
        }
      },
      {
        id:'exposition-01',
        number:1,
        kind:'exposition',
        title:'Экспозиция 1',
        description:'Первая полноценная экспозиция музейного аудиогида.',
        access:'paid',
        duration:873,
        audio:{
          publicUrl:'https://drive.google.com/uc?export=download&id=1qh91-ABf1qbCiKyhI8M_cjYp96L0HOkP',
          status:'drive_hosted'
        }
      }
    ]
  },
  routes:[]
};
