import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, computed } from '@ioc:Adonis/Lucid/Orm'
import { responsiveAttachment, ResponsiveAttachmentContract } from '@ioc:Adonis/Addons/ResponsiveAttachment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pseudo: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @responsiveAttachment({ preComputeUrls: true })
  public avatar: ResponsiveAttachmentContract

  @computed()
  public get avatarUrl() {
    if (this.avatar) {
      return '/uploads/'+this.avatar.breakpoints!.small.name
    }
    return 'https://source.boringavatars.com/beam/40/${this.email}?colors=001449,012677,005BC5,00B4FC,17F9FF'
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
