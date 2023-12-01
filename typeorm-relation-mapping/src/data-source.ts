import "reflect-metadata";
import { DataSource } from "typeorm";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql", //数据库类型
  //数据库服务器的主机和端口号。
  host: "localhost",
  port: 3306,
  //登录数据库的用户名和密码。
  username: "root",
  password: "why262216",
  //指定操作的 database（数据库）
  database: "typeorm_test",
  //synchronize 是根据同步建表，也就是当 database 里没有和 Entity 对应的表的时候，会自动生成建表 sql 语句并执行。
  synchronize: true,
  //打印生成的 sql 语句。
  logging: true,
  //指定有哪些和数据库的表对应的 Entity。
  entities: [User, IdCard],
  //修改表结构之类的 sql
  migrations: [],
  //一些 Entity 生命周期的订阅者，比如 insert、update、remove 前后，可以加入一些逻辑：
  subscribers: [],
  //指定用什么驱动包
  connectorPackage: "mysql2",
  //额外发送给驱动包的一些选项。
  extra: {
    authPlugin: "sha256_password",
  },
});
