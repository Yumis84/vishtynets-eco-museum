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
        duration:196.872,
        transcript:'Добро пожаловать в Виштынецкий эколого-исторический музей. Здесь природа, история и память Роминтской пущи соединяются в одной экскурсии. Мы предлагаем пройти музей вместе с аудиогидом: слушайте записи по порядку и двигайтесь от экспозиции к экспозиции. Это вступление доступно бесплатно. Если вам понравится формат, после него можно открыть полную экскурсию и продолжить с первой экспозиции.',
        transcriptStatus:'draft_pre_recording',
        audio:{
          publicUrl:null,
          status:'awaiting_site_upload',
          sourceFormat:'mp3',
          sourceBytes:1181232,
          sourceSha256:'eced47b1a0d05fb8e19034c1d34abf93f3c076fd342bea8414e45243dccf0a29'
        }
      },
      {
        id:'exposition-01',
        number:1,
        kind:'exposition',
        title:'Экспозиция 1',
        description:'Первая полноценная экспозиция музейного аудиогида.',
        access:'paid',
        duration:null,
        audio:{
          publicUrl:null,
          status:'awaiting_upload'
        }
      }
    ]
  },
  routes:[]
};
