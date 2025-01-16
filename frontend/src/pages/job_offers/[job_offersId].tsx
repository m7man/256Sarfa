import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/job_offers/job_offersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditJob_offers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    business_owner: '',

    job_seeker: '',

    position: '',

    offer_date: new Date(),

    companies: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { job_offers } = useAppSelector((state) => state.job_offers);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { job_offersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: job_offersId }));
  }, [job_offersId]);

  useEffect(() => {
    if (typeof job_offers === 'object') {
      setInitialValues(job_offers);
    }
  }, [job_offers]);

  useEffect(() => {
    if (typeof job_offers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = job_offers[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [job_offers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: job_offersId, data }));
    await router.push('/job_offers/job_offers-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit job_offers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit job_offers'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='BusinessOwner' labelFor='business_owner'>
                <Field
                  name='business_owner'
                  id='business_owner'
                  component={SelectField}
                  options={initialValues.business_owner}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='JobSeeker' labelFor='job_seeker'>
                <Field
                  name='job_seeker'
                  id='job_seeker'
                  component={SelectField}
                  options={initialValues.job_seeker}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Position'>
                <Field name='position' placeholder='Position' />
              </FormField>

              <FormField label='OfferDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.offer_date
                      ? new Date(
                          dayjs(initialValues.offer_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, offer_date: date })
                  }
                />
              </FormField>

              <FormField label='companies' labelFor='companies'>
                <Field
                  name='companies'
                  id='companies'
                  component={SelectField}
                  options={initialValues.companies}
                  itemRef={'companies'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/job_offers/job_offers-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditJob_offers.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_JOB_OFFERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditJob_offers;
