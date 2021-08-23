import {singleton} from 'tsyringe'
import {MessageEvent, WebhookEvent} from '@line/bot-sdk/lib/types'
import {ReplyMessage} from './interfaces/message-parser.interface'

@singleton()
export class MessageParser {
    parse(msg: WebhookEvent): ReplyMessage {
        const a = msg as MessageEvent

        return {
            replyToken: a.replyToken,
            message: {
                type: 'text',
                text: '55555',
            },
        }
        // const content = msg.embeds[0] ?? undefined
        // const title = content?.author?.name ?? ''
        // const body = msg.content ? msg.content : content?.description ?? ''
        // const footer = content?.footer?.text ?? ''

        // if (this.isMyPokemonInfoMessage(title, footer)) {
        //     return this.parseMyPokemonInfoMessage(title, content)
        // }
        //
        // if (this.isTeamMessage(title)) {
        //     return this.parseTeamMessage(content)
        // }
        //
        // if (this.isWildEncounterMessage(title, body)) {
        //     return this.parseWildEncounterMessage(title)
        // }
        //
        // if (this.isChooseBattleActionMessage(title, footer)) {
        //     return this.parseChooseBattleActionMessage(title)
        // }
        //
        // if (this.isBattleEndMessage(title)) {
        //     return this.parseBattleEndMessage()
        // }
        //
        // if (this.isBattleSwappingMessage(title, footer)) {
        //     return this.parseBattleSwappingMessage()
        // }
        //
        // if (this.isPokemonFaintedMessage(title, body)) {
        //     return this.parsePokemonFaintedMessage(title)
        // }
        //
        // if (this.isThrowPokeballMessage(body)) {
        //     return this.parseThrowPokeballMessage(body)
        // }
        //
        // if (this.isNoMorePokeballMessage(body)) {
        //     return this.parseNoMorePokeballMessage()
        // }
        //
        // if (this.isTrainerEncounterMessage(title, footer)) {
        //     return this.parseTrainerEncounterMessage()
        // }
        //
        // if (this.isActionDisabledMessage(body)) {
        //     return this.parseActionDisabledMessage()
        // }
        //
        // if (this.isBlackedOutMessage(body)) {
        //     return this.parseBlackedOutMessage()
        // }
        //
        // if (this.isUnableWhileInBattleMessage(body)) {
        //     return this.parseUnableWhileInBattleMessage()
        // }
    }

    // private parseTeamMessage(content?: MessageEmbed): TeamMessage | undefined {
    //     if (!content) {
    //         return undefined
    //     }
    //
    //     const pokemons: string[] = []
    //     for (const field of content.fields) {
    //         const name = replaceAll(field.name, '*', '')
    //         const start = name.indexOf('> ')
    //         const end = name.indexOf(' Lv')
    //         pokemons.push(name.substr(start + 2, end - (start + 2)))
    //     }
    //
    //     return {
    //         type: 'team',
    //         pokemons: pokemons,
    //     }
    // }
    //
    // private parseWildEncounterMessage(title: string): WildEncounterMessage {
    //     const [pokemon, enemy, shiny] = this.parsePokemonAndEnemyName(title)
    //
    //     return {
    //         type: 'wild-encounter',
    //         pokemon: pokemon,
    //         enemy: enemy,
    //         enemyShiny: shiny === 'shiny',
    //     }
    // }
    //
    // private parseChooseBattleActionMessage(title: string): ChooseBattleActionMessage {
    //     const [pokemon, enemy, shiny] = this.parsePokemonAndEnemyName(title)
    //
    //     return {
    //         type: 'battle-choose-action',
    //         pokemon: pokemon,
    //         enemy: enemy,
    //         enemyShiny: shiny === 'shiny',
    //     }
    // }
    //
    // private parseBattleSwappingMessage(): BattleSwappingMessage {
    //     return {
    //         type: 'battle-swapping',
    //     }
    // }
    //
    // private parseTrainerEncounterMessage(): TrainerEncounterMessage {
    //     return {
    //         type: 'trainer-encounter',
    //     }
    // }
    //
    // private parseBattleEndMessage(): BattleEndMessage {
    //     return {
    //         type: 'battle-end',
    //     }
    // }
    //
    // private parseBlackedOutMessage(): BlackedOutMessage {
    //     return {
    //         type: 'battle-blacked-out',
    //     }
    // }
    //
    // private parseNoMorePokeballMessage(): NoMorePokeballMessage {
    //     return {
    //         type: 'battle-no-more-pokeball',
    //     }
    // }
    //
    // private parseThrowPokeballMessage(body: string): ThrowPokeballMessage {
    //     //const x = "You have used 2 in total and have 21 left"
    //     const used = Number(body.substr(body.indexOf('used ') + 5, body.indexOf(' in') - (body.indexOf('used ') + 5)))
    //     const remain = Number(body.substr(
    //         body.indexOf('and have ') + 9,
    //         body.indexOf(' left') - (body.indexOf('and have ') + 9),
    //     ))
    //     return {
    //         type: 'battle-throw-pokeball',
    //         used,
    //         remain,
    //     }
    // }
    //
    // private parseUnableWhileInBattleMessage(): UnableWhileInBattleMessage {
    //     return {
    //         type: 'unable-while-battling',
    //     }
    // }
    //
    // private parseActionDisabledMessage(): ActionDisabledMessage {
    //     return {
    //         type: 'battle-action-disabled',
    //     }
    // }
    //
    // private parsePokemonFaintedMessage(title: string): PokemonFaintedMessage {
    //     const [pokemon] = this.parsePokemonAndEnemyName(title)
    //
    //     return {
    //         type: 'battleing-pokemon-fainted',
    //         pokemon,
    //     }
    // }
    //
    // private parseMyPokemonInfoMessage(title: string, content?: MessageEmbed): MyPokemonInfoMessage | undefined {
    //     if (!content) {
    //         return undefined
    //     }
    //
    //     const level = Number(title.substr(title.indexOf('Lv ') + 3, title.length))
    //     const name = title.substr(0, title.indexOf(' Lv'))
    //     const gender = content.fields[1].value.startsWith('Male') ? 'male' : 'female'
    //     const locked = content.fields[2].value !== 'No'
    //     const moves = replaceAll(content.fields[3].value, '  **|**  ', ',').split(',').map(move => move.toLowerCase())
    //     const stat = this.parsePokemonStat(content.fields[4].value)
    //     const iv = this.parsePokemonStat(content.fields[5].value)
    //     const ev = this.parsePokemonStat(content.fields[6].value)
    //     const ability = content.fields[7].value
    //     const nature = content.fields[8].value
    //     const item = content.fields[9].value !== 'None' ? content.fields[8].value : undefined
    //
    //     return {
    //         type: 'pokemon-my-info',
    //         name,
    //         level,
    //         gender,
    //         locked,
    //         moves,
    //         stat,
    //         iv,
    //         ev,
    //         ability,
    //         nature,
    //         item,
    //     }
    // }
    //
    // private parsePokemonStat(statStr: string): PokemonStat {
    //     const statWithNames = statStr.split(', ')
    //     const stat: PokemonStat = {
    //         hp: 0,
    //         attack: 0,
    //         defend: 0,
    //         specialAttack: 0,
    //         specialDefend: 0,
    //         speed: 0,
    //     }
    //
    //     for (const statWithName of statWithNames) {
    //         const [name, val] = statWithName.split(': ')
    //
    //         switch (name) {
    //             case 'HP':
    //                 stat.hp = Number(val)
    //                 break
    //             case 'Atk':
    //                 stat.attack = Number(val)
    //                 break
    //             case 'Def':
    //                 stat.defend = Number(val)
    //                 break
    //             case 'SpA':
    //                 stat.specialAttack = Number(val)
    //                 break
    //             case 'SpD':
    //                 stat.specialDefend = Number(val)
    //                 break
    //             case 'Spe':
    //                 stat.speed = Number(val)
    //                 break
    //         }
    //     }
    //
    //     return stat
    // }
    //
    // private isThrowPokeballMessage(body: string): boolean {
    //     return body.indexOf('You have used') > -1 && body.indexOf('just thrown') > -1
    // }
    //
    // private isNoMorePokeballMessage(body: string): boolean {
    //     return body.indexOf('You have no more') > -1 && body.indexOf('to throw') > -1
    // }
    //
    // private isTeamMessage(title: string): boolean {
    //     return title.indexOf('Team Preview') > -1
    // }
    //
    // private isMyPokemonInfoMessage(title: string, footer: string): boolean {
    //     return title.indexOf('Lv') > -1 && footer.indexOf('Total EXP:') > -1
    // }
    //
    // private isWildEncounterMessage(title: string, body: string): boolean {
    //     return title.indexOf('Vs.') > -1 && body.indexOf('A wild') > -1 && body.indexOf('appeared') > -1
    // }
    //
    // private isPokemonFaintedMessage(title: string, body: string): boolean {
    //     return title.indexOf('Vs.') > -1 && body.indexOf('fainted') > -1 && body.indexOf('swapped out fainted') === -1
    // }
    //
    // private isBattleEndMessage(title: string): boolean {
    //     return title.indexOf('Wild battle has ended') > -1 || title.indexOf('battle ended') > -1
    // }
    //
    // private isTrainerEncounterMessage(title: string, footer: string): boolean {
    //     return title.indexOf('Vs.') > -1 && footer.indexOf('Opponent') > -1 && footer.indexOf('team consist') > -1
    // }
    //
    // private isBlackedOutMessage(body: string): boolean {
    //     return body.indexOf('blacked out') > -1
    // }
    //
    // private isChooseBattleActionMessage(title: string, footer: string): boolean {
    //     return title.indexOf('Vs.') > -1 && footer.indexOf(
    //         'Type a number from 1 - 8 or the text shown in the boxes above to perform an action.') > -1
    // }
    //
    // private isActionDisabledMessage(body: string): boolean {
    //     return body.indexOf('Move') > -1 && body.indexOf('is disabled') > -1
    // }
    //
    // private isBattleSwappingMessage(title: string, footer: string): boolean {
    //     return title.indexOf('Swapping') > -1 && footer.indexOf('Type the name of the Pokémon you wish to swap') > -1
    // }
    //
    // private isUnableWhileInBattleMessage(body: string): boolean {
    //     return body.indexOf('You are currently engaged') > -1
    // }
    //
    // private parsePokemonAndEnemyName(title: string): string[] {
    //     let enemy = ''
    //     let pokemon = ''
    //     const indexVs = title.indexOf('Vs.')
    //
    //     let shiny = 'none'
    //     if (indexVs > -1) {
    //         if (enemy.startsWith('★')) {
    //             enemy = enemy.replace('★', '')
    //             shiny = 'shiny'
    //         }
    //
    //     }
    //
    //     return [pokemon, enemy, shiny]
    // }
}

// function replaceAll(string, search, replace) {
//     return string.split(search).join(replace)
// }
