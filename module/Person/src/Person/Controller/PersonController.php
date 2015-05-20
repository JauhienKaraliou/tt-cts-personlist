<?php

namespace Person\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Person\Entity\Person;

class PersonController extends AbstractActionController
{
    public function indexAction()
    {
        /*
        $selectParams = $this->request->getContent();
        $personList = $this->selectAction($selectParams['education'],$selectParams['city']);
        $view = new ViewModel($personList);
        $result = new JsonModel(array(
	    'some_parameter' => 'some value',
            'success'=>true,
        ));

        return $result;
        */
        $view = new ViewModel();
        //@todo this draft
        return $view;
    }

    public function ajaxAction($requestTime= true)
    {
        $response = $this->getResponse();
        $response->setContent(date('H-i-s'));

        $result = new JsonModel(array(
            'some_parameter' => date('H-i-s'),
            'success'=>true,
        ));

        return $result;
    }

    public function createAction($fullname)
    {
        $person = new Person();
        $person->setFullname($fullname);
        $objectManager = $this->getServiceLocator()->get('Doctrine\Common\Persistence\ObjectManager');// @todo ask about wherer to put it
        $objectManager->persist($person);
        //city and education add here
        $objectManager->flush();
    }

    public function selectAction(array $educationId, array $cityId)
    {
        $objectManager = $this->getServiceLocator()->get('Doctrine\Common\Persistence\ObjectManager'); //@todo ask about wherer to put it
        return $objectManager
            ->getRepository('Person\Entity\Person')
            ->findBy(array('education_id'=>$educationId,'city_id'=>$cityId))
            ->getFullname()
            ->getCity()
            ->getEducation();
    }

    public function updateAction($personId,$education)
    {
        $objectManager = $this->getServiceLocator()->get('Doctrine\Common\Persistence\ObjectManager'); //@todo ask about wherer to put it
        return $objectManager
            ->getRepository('Person\Entity\Person',$personId)
            ->setEducation($education)
            ->flush();
    }

    public function deleteAction($personId)
    {
        $objectManager = $this->getServiceLocator()->get('Doctrine\Common\Persistence\ObjectManager'); //@todo ask about wherer to put it
        return $objectManager
            ->getRepository('Person\Entity\Person',$personId)
            ->remove()
            ->flush();
    }
}
