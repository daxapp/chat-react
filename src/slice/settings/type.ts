export enum FontFamily {
    Default = 'Roboto',
    Fredoka = 'Fredoka',
    NotoSans = 'Noto Sans',
    Hubballi = 'Hubballi',
    GreatVibes = 'Great Vibes',
    AguDisplay = 'Agu Display'

}

export default interface ISettingsState {
    textSize: string;
    fontFamily: FontFamily;
    isCtrl: boolean;
}