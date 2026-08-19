// Verified legacy migration batch 22: educational programmes from the legacy museum services page p95.htm.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const source='https://www.wystynez.ru/p95.htm';
  const common={category:'Образовательные программы',legacyUrl:source,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page',legacyOperationalDataStatus:'archive_only_do_not_treat_as_current_offer',photoCredits:['Юлия Алексеева','Алексей Соколов']};

  add({...common,
    id:'country-where-rivers-born',slug:'country-where-rivers-born',title:'Страна, где рождаются реки',subcategory:'Природа и ландшафт',date:null,
    deck:'Музейная программа с путешествием к долине истоков реки Синей — месту, где можно увидеть рождение реки и ландшафт Виштынецкой возвышенности.',
    content:[
      {type:'paragraph',text:'Программа объединяла знакомство с экспозицией музея и реальное путешествие в окрестности Краснолесья — в долину истоков реки Синей.'},
      {type:'paragraph',text:'Старая страница подчёркивала перепады высот до 50 метров, возможность увидеть выходы родников и посетить руины бывшего поселения мельников Прасберг.'},
      {type:'paragraph',text:'Указанные на legacy-странице продолжительность около 2–2,5 часов, бесснежный сезон, размер группы и стоимость относятся к историческому предложению и не считаются действующими без современной проверки.'}
    ],
    archivalProgrammeParameters:{duration:'около 2–2,5 часов',season:'бесснежный период',group:'от 10 человек',price:'300 руб. за участника'}
  });

  add({...common,
    id:'colors-of-red-forest-program',slug:'colors-of-red-forest-program',title:'Цвета Красного леса',subcategory:'Природа и творчество',date:null,
    deck:'Поиск цвета в природе Красного леса: радуга, натуральные красители и собственная «цветная лаборатория».',
    content:[
      {type:'paragraph',text:'Программа приглашала участников исследовать происхождение цвета, способы получения красителей для традиционной одежды и разнообразие цветов Красного леса.'},
      {type:'paragraph',text:'Практическая часть строилась как «цветная лаборатория»: участники искали природные источники цвета и создавали собственные разноцветные лоскуты.'},
      {type:'paragraph',text:'Продолжительность, сезон, размер группы и цена со старой страницы сохраняются только как архивные параметры программы.'}
    ],
    archivalProgrammeParameters:{duration:'3 часа',season:'май–октябрь',group:'15–20 человек',price:'450 руб. за участника'}
  });

  add({...common,
    id:'visiting-the-museum-program',slug:'visiting-the-museum-program',title:'В гостях у музея',subcategory:'Знакомство с музеем',date:null,
    deck:'Короткая музейная программа: экскурсия по экспозиции, знакомство с деятельностью музея, программами и сказочными гномами.',
    content:[
      {type:'paragraph',text:'Программа «В гостях у музея» сочетала экскурсию по экспозиции, рассказ о деятельности музея и знакомство с другими музейными занятиями и программами.'},
      {type:'paragraph',text:'В старом описании также упоминались знакомство со сказочными гномами и дружеское чаепитие с пирогом из местной пекарни.'},
      {type:'paragraph',text:'Продолжительность, размер группы и стоимость из legacy-страницы являются архивными условиями.'}
    ],
    archivalProgrammeParameters:{duration:'1,5 часа',season:'круглый год',group:'от 10 человек',price:'350 руб. за участника'}
  });

  add({...common,
    id:'meet-the-plants-program',slug:'meet-the-plants-program',title:'Знакомьтесь: растения!',subcategory:'Ботаника',date:null,
    deck:'Полевое занятие-знакомство с растениями: названия, происхождение имён и полезные свойства.',
    content:[
      {type:'paragraph',text:'Занятие предлагало небольшое путешествие в поисках новых «знакомых» зелёного мира.'},
      {type:'paragraph',text:'Участники узнавали истории происхождения названий растений и их полезные свойства; старая страница подчёркивала, что занятие можно проходить неоднократно и каждый раз находить новые виды.'},
      {type:'paragraph',text:'Продолжительность, сезон, размер группы и стоимость со старой страницы сохраняются как архивные сведения.'}
    ],
    archivalProgrammeParameters:{duration:'около 1 часа',season:'май–октябрь',group:'10–20 человек',price:'300 руб. за участника'}
  });

  add({...common,
    id:'handmade-candle-workshop',slug:'handmade-candle-workshop',title:'Свеча своими руками',subcategory:'Мастерские',date:null,
    deck:'Музейная мастерская о старых способах освещения и изготовлении собственной восковой свечи.',
    content:[
      {type:'paragraph',text:'Мастерская рассказывала о жизни до электричества, свете лучины и свечи и использовании пчелиного воска.'},
      {type:'paragraph',text:'Практическая часть предлагала познакомиться со способами изготовления восковых свечей и создать собственную свечу.'},
      {type:'paragraph',text:'Исторические параметры продолжительности, размера группы и цены не считаются текущим предложением музея.'}
    ],
    archivalProgrammeParameters:{duration:'около 1,5 часа',season:'круглый год',group:'10–20 человек',price:'400 руб. за участника'}
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'country-where-rivers-born','colors-of-red-forest-program','visiting-the-museum-program','meet-the-plants-program','handmade-candle-workshop'])];
  }
})();
