import {Table, Column,Model,DataType,Default,} from 'sequelize-typescript'



@Table
class Product extends Model{
    @Column
    declare name: string;

    @Column({
        type: DataType.FLOAT()
    })
    declare price: number;

    @Default(true)
    @Column
    declare availability: boolean;
}

export default Product