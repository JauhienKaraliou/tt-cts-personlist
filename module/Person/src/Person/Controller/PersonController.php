<?php

namespace Person\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Person\Entity\Person;

class PersonController extends AbstractActionController
{
    public function indexAction()
    {
        $selectParams = $this->request->getContent();
        $personList = $this->selectAction($selectParams['education'],$selectParams['city']);
        $view = new ViewModel($personList);
        //@todo this draft
        return $view;
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
