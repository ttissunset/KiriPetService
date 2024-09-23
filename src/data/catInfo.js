const catInfos = [
  {
    id: 1,
    imageUrl: "src/assets/image/cat-1.jpg",
    petName: "布偶猫",
    miniDes: "“温顺如同布偶”",
    description: "",
  },
  {
    id: 2,
    imageUrl: "src/assets/image/cat-2.jpg",
    petName: "内伯龙根",
    miniDes: "“雾中的生物”",
    description:
      "尼伯龙根猫也被称为长毛俄罗斯蓝猫，是一个相对较新的品种，也是现存最稀有的猫品种之。这些小猫容易紧张，需要比普通猫更多的社交。",
  },
  {
    id: 3,
    imageUrl: "src/assets/image/cat-3.jpg",
    petName: "孟加拉猫",
    miniDes: "“拥有玫瑰花结的家猫”",
    description: "",
  },
  {
    id: 4,
    imageUrl: "src/assets/image/cat-4.jpg",
    petName: "斯芬克斯猫",
    miniDes: "“个性鲜明的友好猫”",
    description: "",
  },
  {
    id: 5,
    imageUrl: "src/assets/image/cat-5.jpg",
    petName: "汤金斯猫",
    miniDes: "“暹罗和缅甸结合”",
    description: "",
  },
  {
    id: 6,
    imageUrl: "src/assets/image/cat-6.jpg",
    petName: "塞伦盖蒂猫",
    miniDes: "“忠诚的伴侣”",
    description: "",
  },
  {
    id: 7,
    imageUrl: "src/assets/image/cat-7.jpg",
    petName: "约克巧克力猫",
    miniDes: "“黑夜的猎人”",
    description: "",
  },
  {
    id: 8,
    imageUrl: "src/assets/image/cat-8.jpg",
    petName: "波斯猫",
    miniDes: "“优雅的长毛猫”",
    description:
      "波斯猫是一种拥有浓密长毛的猫咪，以其优雅的外貌和温和的性格而受到喜爱。它们需要定期梳理毛发，并且适合居住在安静的环境中。",
  },
  {
    id: 9,
    imageUrl: "src/assets/image/cat-9.jpg",
    petName: "暹罗猫",
    miniDes: "“聪明活泼的伴侣”",
    description:
      "暹罗猫以其独特的外观和聪明的性格著称。它们通常有一身浅色的毛发和深色的耳朵、脸部、手脚，喜欢与人互动和交流，是非常活泼的伴侣。",
  },
  {
    id: 10,
    imageUrl: "src/assets/image/cat-10.jpg",
    petName: "美国短毛猫",
    miniDes: "“温和且适应性强”",
    description:
      "美国短毛猫是一种性格温和、适应性强的猫咪。它们的毛发短而易于打理，通常健康而活跃，适合家庭生活。",
  },
  {
    id: 11,
    imageUrl: "src/assets/image/cat-11.jpg",
    petName: "阿比西尼亚猫",
    miniDes: "“活泼的探险家”",
    description:
      "阿比西尼亚猫是一种非常活泼和好奇的猫咪。它们拥有短毛，喜欢探索周围环境，对家庭非常亲密。",
  },
  {
    id: 12,
    imageUrl: "src/assets/image/cat-12.jpg",
    petName: "雪鞋猫",
    miniDes: "“四脚白色的独特猫”",
    description:
      "雪鞋猫是一种有着四只白色爪子的猫咪，性格温和、友好。它们对人类非常亲密，喜欢参与家庭活动。",
  },
  {
    id: 13,
    imageUrl: "src/assets/image/cat-13.jpg",
    petName: "苏格兰折耳猫",
    miniDes: "“耳朵向下的猫咪”",
    description:
      "苏格兰折耳猫以其独特的向下折耳而闻名。它们性格温柔、友好，是很受欢迎的家庭宠物。",
  },
  {
    id: 14,
    imageUrl: "src/assets/image/cat-14.jpg",
    petName: "土耳其安哥拉猫",
    miniDes: "“优雅的长毛猫”",
    description:
      "土耳其安哥拉猫拥有长毛和优雅的体态，性格活泼、友好。它们对家庭很有感情，喜欢玩耍。",
  },
  {
    id: 15,
    imageUrl: "src/assets/image/cat-15.jpg",
    petName: "埃及猫",
    miniDes: "“古老的自然猫”",
    description:
      "埃及猫是一种古老的自然猫咪，体型优雅，毛发短且易打理。它们性格活泼，对家庭成员非常亲近。",
  },
  {
    id: 16,
    imageUrl: "src/assets/image/cat-16.jpg",
    petName: "剑桥猫",
    miniDes: "“聪明的短毛猫”",
    description:
      "剑桥猫拥有短毛和聪明的性格，适应性强，性格温和。它们是很好的家庭宠物。",
  },
  {
    id: 17,
    imageUrl: "src/assets/image/cat-17.jpg",
    petName: "西伯利亚猫",
    miniDes: "“强壮的长毛猫”",
    description:
      "西伯利亚猫是一种强壮的长毛猫，性格友好、活跃。它们适应性强，对家庭成员非常亲密。",
  },
  {
    id: 18,
    imageUrl: "src/assets/image/cat-18.jpg",
    petName: "巴厘猫",
    miniDes: "“优雅的长尾猫”",
    description:
      "巴厘猫拥有优雅的长尾和柔软的毛发，性格友好、活跃。它们对家庭非常亲近，是很好的伴侣。",
  },
  {
    id: 19,
    imageUrl: "src/assets/image/cat-19.jpg",
    petName: "东方短毛猫",
    miniDes: "“聪明的短毛猫”",
    description:
      "东方短毛猫以其聪明和活跃的性格著称。它们的毛发短且易打理，非常适合作为家庭宠物。",
  },
  {
    id: 20,
    imageUrl: "src/assets/image/cat-20.jpg",
    petName: "日本短尾猫",
    miniDes: "“短尾的可爱猫”",
    description:
      "日本短尾猫是一种短尾的猫咪，性格温和、友好。它们适应性强，非常适合家庭生活。",
  },
  {
    id: 21,
    imageUrl: "src/assets/image/cat-23.jpg",
    petName: "印度猫",
    miniDes: "“敏捷的猫咪”",
    description: "印度猫是一种敏捷且活泼的猫咪，适应性强，对家庭成员非常友好。",
  },
  {
    id: 22,
    imageUrl: "src/assets/image/cat-24.jpg",
    petName: "土耳其梵猫",
    miniDes: "“白色的游泳猫”",
    description:
      "土耳其梵猫是一种白色的长毛猫，特别喜欢水。它们性格活泼、友好，对家庭非常亲密。",
  },
  {
    id: 23,
    imageUrl: "src/assets/image/cat-25.jpg",
    petName: "缅因猫",
    miniDes: "“温和巨人”",
    description:
      "缅因猫是一种大型猫咪，拥有长毛和温和的性格。它们非常友好，对家庭成员很有耐心，是很好的伴侣。",
  },
  {
    id: 24,
    imageUrl: "src/assets/image/cat-26.jpg",
    petName: "阿曼猫",
    miniDes: "“优雅的短毛猫”",
    description:
      "阿曼猫拥有优雅的外观和短毛，性格温和、友好。它们非常适合作为家庭宠物。",
  },
  {
    id: 25,
    imageUrl: "src/assets/image/cat-27.jpg",
    petName: "野猫",
    miniDes: "自然界的猫咪",
    description:
      "野猫是一种适应自然环境的猫咪，性格独立、机警。它们通常生活在野外，但也能适应家庭环境。",
  },
  {
    id: 26,
    imageUrl: "src/assets/image/cat-28.jpg",
    petName: "欧缇猫",
    miniDes: "温和的短毛猫",
    description:
      "欧缇猫以其短毛和温和的性格著称。它们适应性强，非常适合家庭生活。",
  },
  {
    id: 27,
    imageUrl: "src/assets/image/cat-29.jpg",
    petName: "挪威森林猫",
    miniDes: "强壮的自然猫",
    description:
      "挪威森林猫是一种自然繁殖的猫咪，以其强壮的体格和长毛闻名。它们适应性强，喜欢爬树和探索，是非常独立的猫咪。",
  },
  {
    id: 28,
    imageUrl: "src/assets/image/cat-30.jpg",
    petName: "克尔猫",
    miniDes: "短毛且活跃",
    description:
      "克尔猫拥有短毛和活跃的性格。它们性格友好、聪明，非常适合家庭生活。",
  },
  {
    id: 29,
    imageUrl: "src/assets/image/cat-31.jpg",
    petName: "泰国猫",
    miniDes: "活泼的传统猫",
    description:
      "泰国猫是一种活泼且友好的传统猫咪。它们有着优雅的外观和友好的性格，非常适合家庭宠物。",
  },
  {
    id: 30,
    imageUrl: "src/assets/image/cat-32.jpg",
    petName: "猞猁猫",
    miniDes: "自然界的猫咪",
    description:
      "猞猁猫是一种野生猫咪，性格独立、机警。它们通常生活在自然环境中，但也能适应家庭生活。",
  },
  {
    id: 33,
    imageUrl: "src/assets/image/cat-33.jpg",
    petName: "缅甸猫",
    miniDes: "友好的短毛猫",
    description:
      "缅甸猫是一种友好且活泼的短毛猫咪。它们非常适合家庭生活，性格温和，对人类非常亲密。",
  },
  {
    id: 34,
    imageUrl: "src/assets/image/cat-34.jpg",
    petName: "加州闪电猫",
    miniDes: "敏捷的短毛猫",
    description:
      "加州闪电猫是一种敏捷的短毛猫咪，性格活泼、好动。它们非常适合有充足空间的家庭。",
  },
  {
    id: 35,
    imageUrl: "src/assets/image/cat-35.jpg",
    petName: "奥西猫",
    miniDes: "活泼的自然猫",
    description:
      "奥西猫拥有自然的外观和活泼的性格。它们对家庭非常友好，喜欢互动和玩耍。",
  },
  {
    id: 36,
    imageUrl: "src/assets/image/cat-36.jpg",
    petName: "新加坡猫",
    miniDes: "小巧玲珑的猫咪",
    description:
      "新加坡猫是一种小巧玲珑的猫咪，性格友好、活跃。它们适合各种家庭环境，非常受欢迎。",
  },
  {
    id: 37,
    imageUrl: "src/assets/image/cat-37.jpg",
    petName: "秘鲁猫",
    miniDes: "可爱的长毛猫",
    description:
      "秘鲁猫以其长毛和友好的性格著称。它们非常适合家庭生活，对人类非常亲密。",
  },
  {
    id: 38,
    imageUrl: "src/assets/image/cat-38.jpg",
    petName: "塞尔维亚猫",
    miniDes: "优雅的长毛猫",
    description:
      "塞尔维亚猫拥有优雅的外观和长毛。它们性格温和、友好，适合家庭生活。",
  },
  {
    id: 39,
    imageUrl: "src/assets/image/cat-39.jpg",
    petName: "犹太猫",
    miniDes: "聪明的短毛猫",
    description:
      "犹太猫是一种聪明且活跃的短毛猫咪。它们对家庭非常亲密，喜欢参与家庭活动。",
  },
  {
    id: 40,
    imageUrl: "src/assets/image/cat-40.jpg",
    petName: "德文卷毛猫",
    miniDes: "卷毛的短毛猫",
    description:
      "德文卷毛猫以其独特的卷毛和友好的性格而闻名。它们非常活跃、聪明，适合家庭宠物。",
  },
  {
    id: 41,
    imageUrl: "src/assets/image/cat-41.jpg",
    petName: "摩根猫",
    miniDes: "古老的短毛猫",
    description:
      "摩根猫是一种古老的短毛猫咪，性格友好、温和。它们非常适合家庭生活，对人类非常亲密。",
  },
  {
    id: 42,
    imageUrl: "src/assets/image/cat-42.jpg",
    petName: "俄国蓝猫",
    miniDes: "优雅的蓝色猫",
    description:
      "俄国蓝猫以其优雅的蓝色毛发和绿色眼睛著称。它们性格温和、独立，适合安静的家庭环境。",
  },
  {
    id: 43,
    imageUrl: "src/assets/image/cat-43.jpg",
    petName: "比利时猫",
    miniDes: "小巧活泼的猫咪",
    description:
      "比利时猫是一种小巧活泼的猫咪，性格友好、机警。它们适合各种家庭环境，非常受欢迎。",
  },
  {
    id: 44,
    imageUrl: "src/assets/image/cat-44.jpg",
    petName: "库尔特猫",
    miniDes: "友好的短毛猫",
    description:
      "库尔特猫拥有短毛和友好的性格。它们非常适合家庭生活，对人类非常亲密。",
  },
  {
    id: 45,
    imageUrl: "src/assets/image/cat-45.jpg",
    petName: "普特猫",
    miniDes: "自然界的猫咪",
    description:
      "普特猫是一种适应自然环境的猫咪，性格独立、机警。它们通常生活在野外，但也能适应家庭生活。",
  },
  {
    id: 46,
    imageUrl: "src/assets/image/cat-46.jpg",
    petName: "蓬蓬猫",
    miniDes: "长毛且优雅",
    description:
      "蓬蓬猫以其长毛和优雅的体态而闻名。它们性格友好、温和，非常适合家庭生活。",
  },
  {
    id: 47,
    imageUrl: "src/assets/image/cat-47.jpg",
    petName: "希腊猫",
    miniDes: " 小巧玲珑的猫咪",
    description:
      "希腊猫是一种小巧玲珑的猫咪，性格友好、活跃。它们适合各种家庭环境，非常受欢迎。",
  },
  {
    id: 48,
    imageUrl: "src/assets/image/cat-48.jpg",
    petName: "法国猫",
    miniDes: "优雅的短毛猫",
    description:
      "法国猫拥有优雅的短毛和友好的性格。它们适 合家庭生活，对人类非常亲密。",
  },
];
