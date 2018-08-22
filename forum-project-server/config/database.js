const mongoose = require('mongoose')
const User = require('../models/User')
const Category = require('../models/Category')
const encryption = require('../utilities/encryption')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

    User.find({}).then(users => {
      if (users.length > 0) return
      let salt = encryption.generateSalt()
      let password = encryption.generateHashedPassword(salt, '12345678')

      User.create({
        email: 'admin@admin.com',
        username: 'Admin',
        salt: salt,
        password: password,
        roles: ['Admin'],
        isBanned: false
      })
        .then(() => {
          User.find({}).then(users => {
            let authorId = users[0]._id
            Category.find({}).then(categories => {
              if (categories.length > 0) return
              const categoriesSeed = [
                {
                  name: 'Football',
                  creator: authorId
                },
                {
                  name: 'Education',
                  creator: authorId
                },
                {
                  name: 'Basketball',
                  creator: authorId
                },
                {
                  name: 'Marketing',
                  creator: authorId
                },
                {
                  name: 'Programming',
                  creator: authorId
                },
                {
                  name: 'Game Theory',
                  creator: authorId
                }
              ]
              Category
                .create(categoriesSeed)
                .then(() => console.log('Seeded categories successfully.'))
                .then(() => {
                  Category.findOne()
                    .then(category => {
                      const postSeed = [
                        {
                          title: 'Cristiano in Juventus',
                          body: 'When the rumours of a possible deal were first leaked, few believed it to be true. Ronaldo was simply doing his usual summer dance with Real Madrid in a bid to receive more love, support and money from his employers. Additionally, if he were ever to leave, surely it wouldn\'t be to Italy? Yet remarkably, Juventus - renowned for their ability to spot a bargain - have decided to go off script and make the most expensive Serie A signing in history. Agent Jorge Mendes first implied a deal was possible when he met with the club over their £35.5m signing of his client Joao Cancelo from Valencia in June. Moving heaven and earth financially, Juventus found a way to stump up over 105m euros (£93.01m) to Real Madrid to take the soon to be 34-year-old legend to Turin. Then, having agreed to pay the forward over 30m euros (£26.57m) a year in wages after tax (nearly 60m euros before deductions), the deal was struck.',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'Where does it come?',
                          body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'GEB - Kalai',
                          body: 'Games and Economic Behavior (GEB) is a general-interest journal devoted to the advancement of game theory and it applications. Game theory applications cover a wide range of subjects in social, behavioral, mathematical and biological sciences, and game theoretic methodologies draw on a large variety...',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'What is Marketing?',
                          body: 'The management process through which goods and services move from concept to the customer. It includes the coordination of four elements called the 4 P\'s of marketing: (1) identification, selection and development of a product, (2) determination of its price, (3) selection of a distribution channel to reach the customer\'s place, and (4) development and implementation of a promotional strategy. For example, new Apple products are developed to include improved applications and systems, are set at different prices depending on how much capability the customer desires, and are sold in places where other Apple products are sold. In order to promote the device, the company featured its debut at tech events and is highly advertised on the web and on television. Marketing is based on thinking about the business in terms of customer needs and their satisfaction. Marketing differs from selling because (in the words of Harvard Business School\'s retired professor of marketing Theodore C. Levitt) "Selling concerns itself with the tricks and techniques of getting people to exchange their cash for your product. It is not concerned with the values that the exchange is all about. And it does not, as marketing invariable does, view the entire business process as consisting of a tightly integrated effort to discover, create, arouse and satisfy customer needs." In other words, marketing has less to do with getting customers to pay for your product as it does developing a demand for that product and fulfilling the customer\'s needs Read more: http://www.businessdictionary.com/definition/marketing.html',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'What is entertainment?',
                          body: 'Entertainment is a form of activity that holds the attention and interest of an audience, or gives pleasure and delight. It can be an idea or a task, but is more likely to be one of the activities or events that have developed over thousands of years specifically for the purpose of keeping an audience\'s attention.[1] Although people\'s attention is held by different things, because individuals have different preferences in entertainment, most forms are recognisable and familiar. Storytelling, music, drama, dance, and different kinds of performance exist in all cultures, were supported in royal courts, developed into sophisticated forms and over time became available to all citizens. The process has been accelerated in modern times by an entertainment industry that records and sells entertainment products. Entertainment evolves and can be adapted to suit any scale, ranging from an individual who chooses a private entertainment from a now enormous array of pre-recorded products; to a banquet adapted for two; to any size or type of party, with appropriate music and dance; to performances intended for thousands; and even for a global audience.',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'React Tutorial',
                          body: 'In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React. You can see what we’ll be building here: Final Result. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax. We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and is updated as the game progresses. You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game.',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'Is Education Important?',
                          body: 'Why is Education So Important in Our Life? When I started thinking about why education is so important, I remembered my high school years when I used to spend almost five hours a month on math homework, wake up at 6:00 AM and get ready for my PSAL soccer game after school. I remembered my teachers, school subjects, the study and the fun! I never really hated school. But I have seen many of my peers who hated going to school; I have had some friends who did not like the idea of studying. Some needed to be up in summer school for recovery. I personally was always focused because I wanted to become a software engineer. I know it will be hard and very challenging. However I believe I can handle the challenge. The first thing that strikes me about education is knowledge gain. Education gives us a knowledge of the world around us and changes it into something better. It develops in us a perspective of looking at life. It helps us build opinions and have points of view on things in life. People debate over the subject of whether education is the only thing that gives knowledge. Some say education is the process of gaining information about the surrounding world while knowledge is something very different. They are right. But then again, information cannot be converted into knowledge without education. Education makes us capable of interpreting things, among other things. It is not just about lessons in textbooks. It is about the lessons of life. One thing I wish I can do is, to provide education for all: no child left behind and change the world for good!!',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'Lebron in Lakers',
                          body: 'Magic Johnson says LeBron James\' arrival has taken the Los Angeles Lakers\' three-year rebuilding plan to "a whole nother level" and that the team plans to remain disciplined and maintain salary-cap space to pursue another max free agent next summer. The Lakers\' president of basketball operations said the team\'s rebuilding timetable remains on track to take another significant step next season. "If we feel there\'s somebody out there or a deal to be made to make our team better, then we\'ll do it as long as it\'s a great deal for us," Johnson said during a conference call Friday. "If it\'s not, we have our team and we\'ll go to battle, go to war with this team. We feel really good about this team. "Then we\'ll have enough room for next summer to give another player a max deal. [General manager] Rob [Pelinka] and I, we already put the strategy together. LeBron of course changed some of that, but we\'re still going to stay disciplined and hope we\'ll be a team that can have a championship run for a long time."',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        },
                        {
                          title: 'Why do we use it?',
                          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                          author: authorId,
                          authorName: users[0].username,
                          category: category._id,
                          comments: []
                        }
                      ]
                      Post
                        .create(postSeed)
                        .then(() => {
                          console.log('Seeded posts successfully.')
                          Post
                            .findOne()
                            .then(post => {
                              const commentsSeed = [
                                {
                                  creator: authorId,
                                  creatorName: users[0].username,
                                  text: 'The Old Lady has got her man and, for the first time ever, the support and respect of her domestic rivals. The arrival of a reigning Ballon d\'Or winner to Serie A is coup not only for Juventus but for calcio as a whole, helping to somewhat re-establish the reputation of a fallen league. But why Italy? Ronaldo\'s is a career that was always supposed to start in Italy but it will now likely end in the peninsula. In 2003 the disgraced (now former) sporting director of Juventus, Luciano Moggi, had seemingly struck a deal with Sporting Lisbon for the purchase of their talented youngster. As part of the deal, Juve\'s Marcelo Salas was to head the other way but, after visiting Lisbon, the Chilean refused the transfer, forcing Juventus to give up on the rising Portuguese star. Ronaldo went on to join Manchester United and the rest, as they say, is history. Yet Juventus has remained a special club for Ronaldo and he admitted as such earlier this year, saying: "I\'ve always liked Juventus, since I was a child, and I loved to watch them play.',
                                  postId: post._id
                                }
                              ]
                              Comment
                                .create(commentsSeed)
                                .then((commentsSeedResult) => {
                                  console.log(commentsSeedResult)
                                  let postComments = post.comments
                                  postComments.push(commentsSeedResult[0]._id)
                                  post.comments = postComments
                                  post
                                    .save()
                                    .then(result => {
                                      console.log(result)
                                      console.log('Seeded comments successfully')
                                    })
                                    .catch(err => console.log('post save error: ' + err))
                                })
                                .catch(err => console.log('Comment:Error' + err))
                            })
                        })
                        .catch(error => console.log('Error:Post ') + error)
                    })
                })
                .catch((error) => console.log('Error: ' + error))
            })
          })
        })
    })
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
