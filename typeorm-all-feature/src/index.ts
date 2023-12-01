import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // const user = new User();
    // user.id = 1
    // user.firstName = "aaa_111";
    // user.lastName = "bbb_111";
    // user.age = 22;
    // await AppDataSource.manager.save(user);

    //批量插入数据
    // await AppDataSource.manager.save(User, [
    //   { firstName: "ccc", lastName: "ccc", age: 21 },
    //   { firstName: "ddd", lastName: "ddd", age: 22 },
    //   { firstName: "eee", lastName: "eee", age: 23 },
    // ]);

    //批量更新数据
    // await AppDataSource.manager.save(User, [
    //   { id: 2, firstName: "ccc111", lastName: "ccc", age: 21 },
    //   { id: 3, firstName: "ddd222", lastName: "ddd", age: 22 },
    //   { id: 4, firstName: "eee333", lastName: "eee", age: 23 },
    // ]);

    await AppDataSource.manager.delete(User, 1);
    await AppDataSource.manager.delete(User, [2, 3]);

  })
  .catch((error) => console.log(error));
