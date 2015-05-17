<?php

namespace Person\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Person\Entity\City;
use Person\Entity\Education;

/**
 * @ORM\Entity
 */
class Person {

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     *
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $fullname;

    /**
     * @var
     * @ORM\ManyToMany(targetEntity="Education")
     *  @ORM\JoinTable(name="person_education",
     *      joinColumns={@ORM\JoinColumn(name="person_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="education_id", referencedColumnName="id")}
     *      )
     */
    protected $education;

    /**
     * @var
     * @ORM\ManyToMany(targetEntity="City")
     * @ORM\JoinTable(name="person_city",
     *      joinColumns={@ORM\JoinColumn(name="person_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="city_id", referencedColumnName="id")}
     *      )
     */
    protected $city;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getEducation()
    {
        return $this->education;
    }

    /**
     * @param mixed $education
     */
    public function setEducation($education)
    {
        $this->education = $education;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return mixed
     */
    public function getFullname()
    {
        return $this->fullname;
    }

    /**
     * @param mixed $fullname
     */
    public function setFullname($fullname)
    {
        $this->fullname = $fullname;
    }

    /**
     * {inheritdoc}
     */
    public function __construct()
    {
        $this->education = new ArrayCollection();
        $this->city = new ArrayCollection();
    }
}
