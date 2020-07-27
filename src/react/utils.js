import moment from 'moment';

function getCardQuota(cardQuota) {
  switch (cardQuota) {
    case 0: {
      return undefined;
    }
    case 1: {
      return [];
    }
    default: {
      const cardQuotaArr = [];
      for (let i = 2; i <= cardQuota; i++) {
        cardQuotaArr.push(i);
      }
      return cardQuotaArr;
    }
  }
}

export function getDisplay(cardQuota) {
  return {
    card_quota: getCardQuota(cardQuota),
  };
}

export function getVbankDue(payMethod, vbankDue) {
  if (payMethod === 'vbank' && vbankDue !== -1) {
    return moment().add(vbankDue, 'days').format('YYYYMMDD2359');
  }
  return undefined;
}