import { jabilLogo, achauLogo, osaclLogo } from '../../assets/images';
const JABIL_VIETNAM = 'Jabil Vietnam';
const A_CHAU_CATERING = 'Á Châu Catering';
const OSAC_SERVICE = 'OSAC Service';

export const CONG_TYS = {
  items: [
    {
      label: JABIL_VIETNAM,
      value: JABIL_VIETNAM,
    },
    {
      label: A_CHAU_CATERING,
      value: A_CHAU_CATERING,
    },
    {
      label: OSAC_SERVICE,
      value: OSAC_SERVICE,
    },
  ]
}

export const IMAGES_CONG_TY = {
  [JABIL_VIETNAM]: jabilLogo,
  [A_CHAU_CATERING]: achauLogo,
  [OSAC_SERVICE]: osaclLogo,

}