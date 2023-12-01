import { AppDataSource } from "./data-source";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    user.firstName = "wang";
    user.lastName = "tao";
    user.age = 20;

    const idCard = new IdCard();
    idCard.cardName = "1111111";
    idCard.user = user;

    // await AppDataSource.manager.save(user);
    // await AppDataSource.manager.save(idCard);

    // const ics = await AppDataSource.manager.find(IdCard, {
    //   relations: {
    //     user: true,
    //   },
    // });

    const ics = await AppDataSource.manager
      .getRepository(IdCard)
      .createQueryBuilder("ic")
      .leftJoinAndSelect("ic.user", "u")
      .getMany();

    console.log(ics);
  })
  .catch((error) => console.log(error));
