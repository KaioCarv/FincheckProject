import { PlusIcon } from '@radix-ui/react-icons';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '../../../../../app/utils/cd';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Spinner } from '../../../../components/Spinner';
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from './useAccountsController';

export function Accounts(){
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
   toggleValuesVisibility,
   isLoading,
   accounts,
  openNewAccountModal,
  currentBalance,
  } = useAccountsController();
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className='h-full w-full flex items-center justify-center'>
        <Spinner className='text-teal-950/50 fill-white w-10 h-10'/>
        </div>
      )}

    {!isLoading && (
      <>
         <div>
      <span className="tracking-[-0.5px] text-white block">Saldo total</span>

      <div className="flex items-center gap-2">
        <strong className={cn(
          "text-2xl tracking-[-1px] text-white",
          !areValuesVisible && 'blur-md',
        )}>
         {formatCurrency(currentBalance)}
        </strong>

        <button className="w-8 h-8 flex items-center justify-center"
        onClick={toggleValuesVisibility}
        >
          <EyeIcon open={!areValuesVisible}/>
        </button>
      </div>
     </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        {accounts.length === 0 && (
          <>
                <div className="mb-4" slot='container-start'>
                 <strong className="text-white tracking-[-1px] text-lg">
                   Minhas contas
                 </strong>
             </div>

             <button className='mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/5 transition-colors'
             onClick={openNewAccountModal}
             >
              <div className='w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'>
                <PlusIcon className='w-6 h-6'/>
              </div>
              <span className='tracking-[-0.5px] font-medium block w-32 text-center'
              >
                Cadastre uma nova conta
              </span>
             </button>
          </>
        )}
        {accounts.length > 0 && (
           <div>
           <Swiper
               spaceBetween={16}
               slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
               onSlideChange={swiper => {
                 setSliderState({
                   isBeginning: swiper.isBeginning,
                   isEnd: swiper.isEnd,
                 })
               }}
             >
             <div className="flex items-center justify-between mb-4" slot='container-start'>
                 <strong className="text-white tracking-[-1px] text-lg">
                   Minhas contas
                 </strong>

                 <SliderNavigation
                 isBeginning={sliderState.isBeginning}
                 isEnd={sliderState.isEnd}
                 />
             </div>
           {accounts.map(account => (
            <SwiperSlide key={account.id}>
              <AccountCard data={account}/>
             </SwiperSlide>
           ))}


          </Swiper>
           </div>
        )}
      </div>
      </>
    )}
    </div>
  )
}
